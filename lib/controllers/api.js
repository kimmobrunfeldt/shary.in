'use strict';

var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose'),
    Image = mongoose.model('Image');

var config = require('../config/config');


exports.upload = function(req, res) {
    var image;

    fs.readFile(req.files.file.path, function(err, data) {

        var uniqueId = Math.round(Math.random() * Math.pow(10, 10)).toString(36);
        var newPath = path.join(config.uploadsDir, uniqueId);

        fs.writeFile(newPath, data, function(err) {
            if (!err) {
                image = new Image({
                    hash: uniqueId,
                    path: newPath
                });

                image.save(function(err) {
                    console.log('Image.save returned', err)

                    if (!err) {
                        // Remove temporary file
                        fs.unlink(req.files.file.path);

                        res.send(image);
                    } else {
                        res.send(err);
                    }

                });
            }
        });

    });
};

exports.getImage = function(req, res) {
    var imageId = req.params.imageId;

    Image.findOne({ hash: req.params.imageId }, function(err, image) {
        console.log(err, image)
        if (err) {
            res.send(err);
        } else if (!image) {
            res.send('No such image');
        } else {
            res.sendfile(image.path);
        }
    });
};
