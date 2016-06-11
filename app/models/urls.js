'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
	original: {
	    id: String,
	    displayName: String,
	    username: String,
        publicRepos: Number
	}
});

module.exports = mongoose.model('Url', Url);
