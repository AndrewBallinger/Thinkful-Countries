//BOILERPLATE
angular.module('contApp', ['contAppViews', 'ngRoute', 'ngAnimate'])
       .config(function($locationProvider, $routeProvider) {
         ͏      $locationProvider.hashPrefix('!');
         ͏      $routeProvider.otherwise({
           ͏        redirectTo : '/'
           ͏      });
         ͏    });







