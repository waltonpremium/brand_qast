//locations.service.js
angular.module("brandqastApp")
.service("Locations", function($http) {
  this.getLocations = function() {
    return $http.get("/api/v1/locations").
      then(function(response) {
        return response;
      });
  };
  this.getLocation = function(location_id) {
    return $http.get("/api/v1/locations/" + location_id).
      then(function(response) {
        return response;
      });
  };
  this.createLocation = function(location) {
    return $http.post("/api/v1/locations", location).
      then(function(response) {
        return response;
      });
  };
});
