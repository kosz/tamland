(function () {
  'use strict';

  // Angular style service
  // Returns a function, reusable in many places
  // Converts the API unit of measurement for temperature into Celsius
  entangular.service('$celsiusConverter', [], function () {

    return function (temperature) {
      return Math.round(temperature - 273.15);
    };

  });

})();
