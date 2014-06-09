'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * File Schema
 */
var FileSchema = new Schema({
    // File name with extension
    name: String,

    // File's name without extension
    baseName: {type: String, index: {unique: true, dropDups: true}}
});


mongoose.model('File', FileSchema);
