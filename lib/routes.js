'use strict';

var path = require('path');
var api = require('./controllers/api');

/**
 * Application routes
 */
module.exports = function(app) {
    // Server API Routes
    app.post('/api/upload', api.upload);

    // All undefined api routes should return a 404
    app.get('/api/*', function(req, res) {
        res.send(404);
    });

    app.get('/', function(req, res) {
        res.sendfile(path.join(__dirname, '../index.html'));
    });

    // File route
    app.get('/:filePath', api.getFile);

    // File ID route
    app.get('/:fileId', api.showFile);
};
