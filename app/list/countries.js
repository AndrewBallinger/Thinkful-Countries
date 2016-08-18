viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/countries", {
    templateUrl : './countries/countries.html',
    controller : 'CountriesCtrl as countries'
  });
}]);

viewModule.controller('CountriesCtrl', ['geoCountries', function(geoCountries) {
  countries = this;
  geoCountries()
    .then((countriesResponse) => countries.response = countriesResponse);
}]);
