/*global describe beforeEach it inject expect */
describe("CountriesView", function() {
  beforeEach(module("contAppViews"));

  describe("/countries route", function() {
    it('should load the template, controller and call the resolve',
       inject(function($location, $rootScope, $httpBackend, $route) {
         $httpBackend.whenGET('./countries/countries.html').respond('...');

         $rootScope.$apply(function() {
           $location.path('/countries');
         });

         $httpBackend.flush();
         
         expect($route.current.controller).toBe("CountriesCtrl as countries");
         expect($route.current.loadedTemplateUrl).toBe("./countries/countries.html");

         $rootScope.$digest();

         $httpBackend.verifyNoOutstandingRequest();
         $httpBackend.verifyNoOutstandingExpectation();
       }));
  });

});
