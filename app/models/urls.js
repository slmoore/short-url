'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
    longSite: String,
    shortSite: Number
});

module.exports = mongoose.model('Url', Url);
