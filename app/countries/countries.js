viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/countries", {
    templateUrl : './countries/countries.html',
    controller : 'CountriesCtrl as countries'
  });

  $routeProvider.when("/countries/:code", {
    templateUrl : './countries/country.html',
    controller : 'CountryCtrl as country',
    resolve : {
      country : ['geoCountry', '$route', function(geoCountry, $route){
        return geoCountry($route.current.params.code);
      }]
    }
  });
}]);

viewsModule.controller('CountriesCtrl', ['geoCountries', '$location', function(geoCountries, $location) {
  countries = this;
  countries.response = [];
  countries.errors = [];
  geoCountries()
    .then(
      (countriesResponse) => {
        countries.response = countriesResponse
      }
    );
}]);

viewsModule.controller('CountryCtrl', ['geoNeighbors', 'geoCapitalPopulation', '$location', 'country', function(geoNeighbors, geoCapitalPopulation, $location, country) {
  country = angular.merge(this, country);
  country.neighbors = [];
  country.capital_population = [];
  geoNeighbors(country).then( (response) => country.neighbors = response );
  geoCapitalPopulation(country).then( (response) => country.capital_population = response );
}]);
