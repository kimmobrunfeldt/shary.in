'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Image Schema
 */
var ImageSchema = new Schema({
  hash: String,
  path: String
});


mongoose.model('Image', ImageSchema);
