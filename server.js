'use strict';
//initialize dependencies
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var app = express();
require('dotenv').load();
//connect to database
mongoose.connect(process.env.MONGO_URI);
//load controllers and views
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
//call routes module, pass in application variables
routes(app);
//start listening for requests
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
