//BOILERPLATE
angular.module('contApp', ['contAppViews', 'ngRoute', 'ngAnimate'])
       .config(['$locationProvider', '$routeProvider',
                function ($locationProvider, $routeProvider) {
                  $routeProvider.otherwise( { redirectTo: '/' } );
                }]);
