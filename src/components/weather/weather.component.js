// WARNING: contains vanilla flavoured spaghetti
(function () {
  'use strict';
  function WeatherComponent (element,injections) {

    var self = this;

    self.timeNow = new Date();
    self.element = element;
    self.injections = injections; // one way of accessing injections

    var $celsiusConverter = injections.$celsiusConverter; // another way, which eliminates a dot
    self.$iconChanger = injections.$iconChanger; // and another way

    /*
     * @function renderWeatherData
     *
     * @description
     * Renders weather data on the WeatherComponent
     * Used as a callback by the $weather service
     */
    self.renderWeatherData = function () {
      self.renderDetailedInfo(self.injections.$weather.list[0]);
      self.renderCityInfo(self.injections.$weather.city);
      self.$iconChanger.renderWeatherIcon(self.injections.$weather.list[0]);
      self.renderMultiDayForecast(self.injections.$weather.list);
    };

    self.renderDetailedInfo = function (day) { // rushed ( need separation of concerns, need angular directive )
      var currentTemp = self.element.querySelector('.weather-current-temp');
      var selectedDate = self.element.querySelector('.selected-date');
      currentTemp.innerText = $celsiusConverter(day.temp.day);// rushed ( need angular filter ) // well made a service
      selectedDate.innerText = new Date(day.dt*1000).toString().split(' ').slice(0,4).join(' '); // rushed ( need angular filter )
      // need moment js
    };

    // renders the forecast for multiple days
    self.renderMultiDayForecast = function (days) {
      var dailyForecast = element.querySelector('weather-daily-forecasts');
      dailyForecast.innerHTML = '';
        days.forEach(function (day) {
          var dayForecast = document.createElement('weather-daily-forecast');
          // more vanilla flavoured spaghetti
          var date = new Date(day.dt*1000); // needs to be refactored. would love moment here
          dayForecast.innerHTML = '<i class="weather-icon wi ' + self.$iconChanger.iconMap[day.weather[0].icon] + '"></i>' +
                                  '<p>' + $celsiusConverter(day.temp.day) +  ' °C</p>' +
                                  '<p>' + date.toString().split(' ').slice(0,3).join(' ')  + '</p>';
          dailyForecast.appendChild(dayForecast);
        });
    };

    self.renderCityInfo = function (city) {
      var cityInfo = self.element.querySelector('.city-info');
      cityInfo.innerText = city.name + ' .' + city.country;
    };

    self.searchCity = function () {
      var city = self.getCitySearchName();
      self.injections.$weather.get({
        city: city,
        callback: self.renderWeatherData
      });
    };

    //
    // starts to be spaghetti code due to lack of framework and time to mature the code
    // luckily this can be refactored into an entangular service, or even better ...
    // lots to say on these subjects
    self.getCitySearchName = function () {
      var citySearch = element.querySelector('input');
      // TODO: remove default
      return citySearch.value && citySearch.value !== '' ? citySearch.value : 'Toronto';
    };

    self.searchCity(); // TODO: need better solution to automatically load. need Angular ui.route / angular/router

    // EVENT Binding, TODO: create automatic event binding mechanism, TODO: move all bindings in same place
    var searchButton = element.querySelector('.fa-search');
    searchButton.addEventListener('click', self.searchCity);
    // rushed, last minute change, needs to be handled elegantly in event halding system
    window.addEventListener('keypress', function(key) {
      if (key.keyCode === 13) { self.searchCity() }
    });

  }

  // angular style declaration
  // with injections
  entangular.component('weather', [
    '$weather',
    '$iconChanger',
    '$celsiusConverter'
    ], WeatherComponent);

})();
