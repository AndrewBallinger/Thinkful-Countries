/*global describe beforeEach it inject expect */
describe("HomeView", function() {
  beforeEach(module("contAppViews"));

  describe("/home route", function() {
    it('should load the template, controller and call the resolve',
       inject(function($location, $rootScope, $httpBackend, $route) {
         $httpBackend.whenGET('./home/home.html').respond('...');

         $rootScope.$apply(function() {
           $location.path('/');
         });
         $httpBackend.flush();
         expect($route.current.controller).toBeUndefined();
         expect($route.current.loadedTemplateUrl).toBe("./home/home.html");

         $httpBackend.verifyNoOutstandingRequest();
         $httpBackend.verifyNoOutstandingExpectation();
       }));
  });
  });
