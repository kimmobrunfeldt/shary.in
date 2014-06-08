'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');
var uploadsDir = path.join(rootPath, 'uploads');

module.exports = {
  root: rootPath,
  uploadsDir: uploadsDir,
  port: process.env.PORT || 9000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};
