'use strict';
//initialize dependencies
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var validator = require('validator');
var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);
//connect to database
mongoose.connect(process.env.MONGO_URI);
//load controllers, views, other files
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
//setup session
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//pass application variables to routes module
routes(app, passport, validator);
//start listening for requests
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});