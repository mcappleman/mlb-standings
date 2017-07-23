'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var express = require('express');
var Router = new express.Router();
var RecordController = require(`${ROOT_DIR}/lib/controllers/RecordController`);
var GameController = require(`${ROOT_DIR}/lib/controllers/GameController`);

Router.get('/standings', (req, res, next) => {

	var sort = {
		win_percent: -1
	}

	return RecordController.find(sort)
	.then((records) => {

		res.send({
			status: 200,
			message: 'Here is the standings',
			data: records
		});

	})
	.catch((err) => {

	    res.send({
	        status: 500,
	        message: 'Error getting that request',
	        error: err
	    });

	});

});

Router.get('/games/:day', (req, res, next) => {

	var sort = {
		number_fire_odds: -1
	}
	var reqDate = new Date(req.params.day);

	return GameController.getDay(reqDate, sort)
	.then((games) => {

		res.send({
			status: 200,
			message: 'Here are the games',
			data: games
		});

	})
	.catch((err) => {

	    res.send({
	        status: 500,
	        message: 'Error getting that request',
	        error: err
	    });

	});

});

Router.get('/schedule/:team', (req, res, next) => {

	var sort = {
		date: 1
	}
	var team = req.params.team;

	return GameController.getSchedule(team, sort)
	.then((games) => {

		res.send({
			status: 200,
			message: 'Here by thy schedule.',
			data: games
		});

	})
	.catch((err) => {

		res.send({
			status: 500,
			message: 'Error getting the schedule',
			error: err
		});

	});

})

Router.put('/record/:id', (req, res, next) => {

	var id = req.params.id

	return RecordController.update(id, req.body)
	.then((record) => {

		res.send({
			status: 200,
			message: 'Updated Record',
			data: record
		});

	})
	.catch((err) => {

	    res.send({
	        status: 500,
	        message: 'Error getting that request',
	        error: err
	    });

	});

});

module.exports = Router;

