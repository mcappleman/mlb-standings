'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var Record = require(`${ROOT_DIR}/lib/models/Record`);

var RecordController = {

    find: function(sort) {

    	return Record
    	.find({ year: 2017 })
    	.sort(sort)
    	.populate('team')
    	.then((records) => {

    		return records;

    	})
    	.catch((err) => { throw err; });

    },

    findOneByTeam: function(team) {

    	return Record
    	.findOne({ year: 2017, team: team })
    	.populate('team')
    	.then((record) => {

    		return record;

    	})
    	.catch((err) => { throw err ;});

    },

    update: function(id, body) {

    	var eloRating = Number(body.rating);

    	return Record.update({ _id: id }, {$set: { elo_rating: eloRating }})
    	.then((record) => {

    		return Record.findOne({ _id: id });

    	})
    	.catch((err) => { throw err; });

    }

};

module.exports = RecordController;
