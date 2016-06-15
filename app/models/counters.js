'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema to hold a single counter value that is incremented for every URL
var Counter = new Schema({
    _id: {type: String},
    seq: {type: Number, default: 0}
});
//unique index on sequence
Counter.path('seq').index({ unique: true });

module.exports = mongoose.model('Counter', Counter);
