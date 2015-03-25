(function () {
  'use strict';

  // Angular style service
  // Encapsulates a '$http' request
  // Ideally I'd like to use Restangular
  // Very messy
  // Ideally if no framework is in place i'd like to create some sort of
  // Restful resource object, that could encapsulate the concerns of speaking
  entangular.service('$weather', [], function () {

    var $weather = {};

    $weather.data = {};

    $weather.get = function get (config) {

      var request = new XMLHttpRequest();
      request.open('GET',
        'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + config.city + '&APPID=82f12747eff0734aad02b2530dfa4839', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          $weather.city = JSON.parse(request.response)['city'];
          $weather.list = JSON.parse(request.response)['list'];
          config.callback();
        } else {
          throw new Error(request.response);
        }
      };

      request.onerror = function(e) {
        throw new Error(e);
      };
      request.send();
    };

    return $weather;

  });

})();
