/*global angular*/
angular.module('geoLibrary', ['xml'])
  .constant("API_ROUTE", "http://api.geonames.org/")
  .constant("USERNAME", "andrewballinger")
  .config([ '$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  }])
 .factory('geoRouter', ['API_ROUTE', 'USERNAME', "$http", function(API_ROUTE, USERNAME, $http){
   return function(route, params) {
     var _params = angular.merge({ username: USERNAME }, params);
     return $http.get(API_ROUTE + route,{ params: _params, timeout: 2000, cache: true } )
   }
 }])
 .factory('geoCountries', ['geoRouter', '$q', function(geoRouter, $q) {
     return () => { return geoRouter("countryInfo")
                 .then( (response) => $q.when(response.data.geonames.country))};
 }])
  .factory('geoCountry', ['geoRouter', '$q', function(geoRouter, $q) {
    return function(countryCode) {
      return geoRouter("countryInfo", { country: countryCode })
        .then( (response) => {
          return $q.when(response.data.geonames.country) })
   }}])
  .factory('geoNeighbors', ['geoRouter', '$q', function(geoRouter, $q){
    return function(country) {
      return geoRouter("neighbours", {
        country: country.countryCode
      })
      .then( function(response) {
        return $q.when(response.data.geonames.geoname);
      })
    }
  }])
  .factory('geoCapitalPopulation', ['geoRouter', '$q', function(geoRouter, $q){
    return function(country) {
      return geoRouter("search", {
        country: country.countryCode,
        name_equals: country.capital,
        is_name_required: true,
        style: "LONG"
      })
      .then( function(response) {
        var geoname = response.data.geonames.geoname;
        var population = geoname.population || geoname[0].population;
        return $q.when(population);
      })
    }
  }])
