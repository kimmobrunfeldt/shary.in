'use strict';

var express = require('express'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

var multer = require('multer');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

var app = express();
app.use(multer({
    // By default, system's tmp dir is used. However you can set the temp
    // dir to specific location.
    // dest: config.uploadsDir,

    limits: {
        fileSize: 1024 * 1024 * 300
    }
}));
app.use(cors());

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
var server = app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Handle SIGTERM gracefully. Heroku will send this before idle.
process.on('SIGTERM', function() {
    console.log('SIGTERM received');
    console.log('Close express server');
    server.close(function() {
        console.log('Close mongodb connection');
        mongoose.disconnect();
    });
});

// Expose app
exports = module.exports = app;
