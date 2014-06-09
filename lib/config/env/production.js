'use strict';

var path = require('path');

module.exports = {
  root: path.join(__dirname, '../../..'),
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/shary'
  }
};
