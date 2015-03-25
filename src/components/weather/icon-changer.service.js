(function () {
  'use strict';

  //
  // Angular Style singleton service
  // Declared just like an angular service
  // Separates some concerns from a very fat controller
  // Sadly no thing controllers in this iteration.
  entangular.service('$iconChanger', [], function () {

    var $iconChanger = {};

    // private
    var iconMap = {
      '01d': 'wi-day-sunny',
      '02d': 'wi-day-cloudy',
      '03d': 'night-partly-cloudy',
      '04d': 'wi-cloudy',
      '09d': 'wi-day-showers',
      '10d': 'wi-day-rain-mix',
      '11d': 'wi-day-thunderstorm',
      '13d': 'wi-day-snow',
      '50d': 'wi-day-fog',
      '01n': 'wi-night-clear',
      '02n': 'wi-night-cloudy',
      '03n': 'wi-night-cloudy',
      '04n': 'wi-cloudy',
      '09n': 'wi-night-alt-showers',
      '10n': 'wi-night-alt-rain-mix',
      '11n': 'wi-night-alt-thunderstorm',
      '13n': 'wi-night-snow',
      '50n': 'wi-night-fog'
    };
    $iconChanger.iconMap = iconMap; // should be private
    // making it public for a quick and dirty last minute feature // TODO refactor

    // public
    $iconChanger.renderWeatherIcon = function (day) {
      var icon = day.weather[0].icon;
      var weatherIcon = document.querySelector('.weather-icon');
      weatherIcon.className = 'weather-icon wi ' + iconMap[icon];
    };

    return $iconChanger;

  });

})();
