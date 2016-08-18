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
  geoCountries()
    .then(
      (countriesResponse) => {
        countries.response = countriesResponse
      }
    );

  countries.countryClicked = function(country){
    $location.path('/countries/' + country.countryCode);
  }
}]);

viewsModule.controller('CountryCtrl', ['geoNeighbors', 'geoCapitalPopulation', '$location', 'country', function(geoNeighbors, geoCapitalPopulation, $location, country) {
  country = angular.merge(this, country);
  country.neighbors = []

  geoNeighbors(country).then( (response) => country.neighbors = response );

  geoCapitalPopulation(country).then( (response) => country.capital_population = response );

  country.neighborClicked = function(neighbor) {
    $location.path('/countries/' + neighbor.countryCode);
  }
  
}]);
