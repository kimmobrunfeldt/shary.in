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
    baseName: {type: String, index: {unique: true, dropDups: true}},

    created_at: { type: Date },
    updated_at: { type: Date }
});


FileSchema.pre('save', function(next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }

    next();
});


mongoose.model('File', FileSchema);
