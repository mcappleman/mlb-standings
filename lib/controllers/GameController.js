'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var Game = require(`${ROOT_DIR}/lib/models/Game`);
var RecordController = require(`${ROOT_DIR}/lib/controllers/RecordController`);

var GameController = {

    getDay: function(day, sort) {

        var startDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0, 0);
        var endDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);

    	return Game
    	.find({ date: { $gt: startDay, $lt: endDay} })
    	.sort(sort)
    	.populate('number_fire_favorite')
        .lean()
    	.then((games) => {

    		return populateRecords(games);

    	})
    	.catch((err) => {
    		throw err;
    	});

    }

};

module.exports = GameController;

function populateRecords(games) {

    var promises = [];

    games.forEach((game) => {

        var promise = new Promise((resolve, reject) => {

            var currentGame = game;

            return RecordController.findOneByTeam(currentGame.away_team)
            .then((record) => {

                currentGame.away_team = record;
                console.log('Current Game', currentGame);
                return RecordController.findOneByTeam(currentGame.home_team);

            })
            .then((record) => {

                currentGame.home_team = record;
                console.log('Game after looking up the home team', currentGame);
                return resolve();

            })
            .catch((err) => { console.log('Some error here', err); return reject(err) });

        });

        promises.push(promise);

    });

    return Promise.all(promises)
    .then(() => {
        return games;
    });

}
