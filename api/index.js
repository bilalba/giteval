'use strict';
var express = require('express'),
	github = require('github'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./config');
const session = require('express-session');
var app = express();


var port = process.env.PORT || config.port;
app.listen(port);

console.log('Listenin on port' +port +'...');