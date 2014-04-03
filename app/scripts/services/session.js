'use strict';

angular.module('theMostSimpleImagebinApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
