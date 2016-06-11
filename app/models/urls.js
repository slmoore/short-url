'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
	site: {
	    longSite: String,
	    shortSite: Number
	}
});

module.exports = mongoose.model('Url', Url);
