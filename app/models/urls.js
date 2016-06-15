'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
    longSite: {type: String, required: true},
    shortSite: {type: Number, required: true}
});
//unique index on site url
Url.path('longSite').index({ unique: true });

module.exports = mongoose.model('Url', Url);
