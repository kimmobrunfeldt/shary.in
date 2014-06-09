'use strict';

var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose'),
    File = mongoose.model('File');

var config = require('../config/config');


exports.upload = function(req, res) {
    var uploadFile = req.files.file;

    fs.readFile(uploadFile.path, function(err, data) {
        if (err) {
            res.status(500);
            res.send(err.toString());
            return;
        }

        var extension = path.extname(uploadFile.name);

        // This might lead to collisioning uploads, so what?
        // The most important thing is to have short ids
        var uniqueId = Math.round(Math.random() * Math.pow(10, 6)).toString(36).toLowerCase();
        var newFileName = uniqueId + extension;
        var newPath = path.join(config.uploadsDir, newFileName);

        fs.writeFile(newPath, data, function(err) {
            if (err) {
                res.status(500);
                res.send(err.toString());
                return;
            }

            var file = new File({
                name: newFileName,
                baseName: uniqueId
            });

            file.save(function(err) {
                if (err) {
                    res.status(500);
                    res.send(err.toString());
                    return;
                }

                // Remove temporary file
                fs.unlink(uploadFile.path);
                res.send(file);
            });
        });

    });
};

exports.getFile = function(req, res) {
    var filePath = req.params.filePath;

    File.findOne({ name: req.params.filePath }, function(err, file) {
        if (err) {
            res.send(err);
        } else if (!file) {
            res.send('No such file');
        } else {
            res.sendfile(path.join(config.uploadsDir, filePath));
        }
    });
};
