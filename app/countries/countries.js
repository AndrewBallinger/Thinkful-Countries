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
      },
      () => {
        countries.errors = countries.errors.concat(["Unable to load countries list"]) }
    );
}]);

viewsModule.controller('CountryCtrl', ['geoNeighbors', 'geoCapitalPopulation', '$location', 'country', '$q', function(geoNeighbors, geoCapitalPopulation, $location, country, $q) {
  country = angular.merge(this, country);
  country.neighbors = undefined;
  country.capital_population = undefined;
  country.errors = [];

  country.loading = true;
  $q.all( { neighbors: geoNeighbors(country), population : geoCapitalPopulation(country) } )
    .then( (response) => {
      country.capital_population = response.population 
      country.neighbors = response.neighbors
      country.loading = false },
           () => {
             country.errors = country.errors.concat(["Unable to load country details"]) } );

}]);
