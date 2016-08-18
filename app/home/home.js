viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "/home/home.html",
    controller : "HomeCtrl as home"
  });
}]);

viewsModule.controller('HomeCtrl', ['$location', function($location) {
  home = this;
  home.buttonClicked = function () {
    $location.path('/countries');
  }
}]);
