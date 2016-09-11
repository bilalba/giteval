'use strict';
var express = require('express'),
	github = require('github'),
	logger = require('morgan'),
	calculate = require('./routes/calculate'),
	// mongoose = require('mongoose'),
	config = require('./config');
// const session = require('express-session');
var app = express();

app.use(logger('dev'));
app.use(express.static('web/dist'))

var port = process.env.PORT || config.port;

app.get('/getuser', calculate.getUser);

app.get('/getfollowerscore', calculate.followers);
app.get('/getactivityscore', calculate.activity);
app.get('/getrepodata', calculate.repodata);
app.get('*', function(req,res){res.send({error: 404})});

app.listen(port);

console.log('Listenin on port' +port +'...');