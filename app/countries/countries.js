/*global viewsModule*/
viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/countries", {
    templateUrl : './countries/countries.html',
    controller : 'CountriesCtrl as countries'
  });
}]);

viewsModule.controller('CountriesCtrl', ['geoCountries', function(geoCountries) {
  var countries = this;
  countries.response = [];
  countries.errors = [];

  geoCountries().then(
      (countriesResponse) => { countries.response = countriesResponse },
      () => { countries.errors = countries.errors.concat(["Unable to load countries list"]) }
    );
}]);
