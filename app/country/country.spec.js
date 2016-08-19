/*global describe beforeEach it inject expect */
describe("CountryView", function() {
  beforeEach(module("contAppViews"));

  describe("/country route", function() {
    it('should load the template, controller and call the resolve',
       inject(function($location, $rootScope, $httpBackend, $route) {
         $httpBackend.whenGET('./country/country.html').respond('...');
         $httpBackend.expectGET('http://api.geonames.org/countryInfo?country=US&username=andrewballinger').respond({geonames:{country:{countryCode: "US"}}})


         $rootScope.$apply(function() {
           $location.path('/countries/US');
         });

         $httpBackend.flush();
         
         expect($route.current.controller).toBe("CountryCtrl as country");
         expect($route.current.loadedTemplateUrl).toBe("./country/country.html");

         $rootScope.$digest();

         $httpBackend.verifyNoOutstandingRequest();
         $httpBackend.verifyNoOutstandingExpectation();
       }));
  });
  });
