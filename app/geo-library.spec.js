/*global expect describe beforeEach it inject rootScope */

describe("geoRouter", () => {
  beforeEach(module('geoLibrary'));

  it('should produce a cached http request', inject( (API_ROUTE, geoRouter, $httpBackend, $rootScope) => {

    $httpBackend.expectGET(API_ROUTE + 'route?username=andrewballinger').respond(200);

    var success = false
    geoRouter('route').then( () => success = true );
    $httpBackend.flush();
    expect(success).toBe(true);
    $httpBackend.verifyNoOutstandingRequest;

    var success = false
    geoRouter('route').then( () => success = true );
    $rootScope.$digest();
    expect(success).toBe(true);

  }));

  it('should produce a cached http request with parameters', inject( (API_ROUTE, geoRouter, $httpBackend, $rootScope) => {

    $httpBackend.expectGET(API_ROUTE + 'route?param=param&username=andrewballinger').respond(200);

    var success = false
    geoRouter('route', {param: "param"}).then( () => success = true );
    $httpBackend.flush();
    expect(success).toBe(true);
    $httpBackend.verifyNoOutstandingRequest();

    var success = false
    geoRouter('route', {param: "param"}).then( () => success = true );
    $rootScope.$digest();
    expect(success).toBe(true);

  }));
  
});

describe("geoCountries", () => {
  beforeEach(module('geoLibrary'));

  it('should produce a cached countries request', inject( (API_ROUTE, geoCountries, $httpBackend, $rootScope) => {

    $httpBackend.expectGET(API_ROUTE + 'countryInfo?username=andrewballinger').respond( {geonames:{country:[]}} );

    var success = false
    geoCountries().then( () => success = true );
    $httpBackend.flush();
    expect(success).toBe(true);
    $httpBackend.verifyNoOutstandingRequest;

    var success = false
    geoCountries().then( () => success = true );
    $rootScope.$digest();
    expect(success).toBe(true);

  }));

});

describe("geoCountry", () => {
  beforeEach(module('geoLibrary'));

  it('should produce a cached country request', inject( (API_ROUTE, geoCountry, $httpBackend, $rootScope) => {

    $httpBackend.expectGET(API_ROUTE + 'countryInfo?country=US&username=andrewballinger').respond( {geonames:{country:[]}} );

    var success = false
    geoCountry("US").then( () => success = true );
    $httpBackend.flush();
    expect(success).toBe(true);
    $httpBackend.verifyNoOutstandingRequest;

    var success = false
    geoCountry("US").then( () => success = true );
    $rootScope.$digest();
    expect(success).toBe(true);

  }));

});

describe("geoNeighbors", () => {
  beforeEach(module('geoLibrary'));

  it('should produce a cached neighbors request', inject( (API_ROUTE, geoNeighbors, $httpBackend, $rootScope) => {

    $httpBackend.expectGET(API_ROUTE + 'neighbours?country=US&username=andrewballinger').respond( {geonames:{geoname:[]}} );

    var success = false
    geoNeighbors({countryCode: "US"}).then( () => success = true );
    $httpBackend.flush();
    expect(success).toBe(true);
    $httpBackend.verifyNoOutstandingRequest;

    var success = false
    geoNeighbors({countryCode: "US"}).then( () => success = true );
    $rootScope.$digest();
    expect(success).toBe(true);

  }));

});

describe("geoCapitalPopulation", () => {
  beforeEach(module('geoLibrary'));

  it('should produce a cached population request', inject( (API_ROUTE, geoCapitalPopulation, $httpBackend, $rootScope) => {

    $httpBackend.expectGET(API_ROUTE + 'search?country=US&is_name_required=true&style=LONG&username=andrewballinger').respond( {geonames:{geoname:{population:9001}}} );

    var success = false
    geoCapitalPopulation({countryCode: "US"}).then( () => success = true );
    $httpBackend.flush();
    expect(success).toBe(true);
    $httpBackend.verifyNoOutstandingRequest;

    var success = false
    geoCapitalPopulation({countryCode: "US"}).then( () => success = true );
    $rootScope.$digest();
    expect(success).toBe(true);

  }));

});


