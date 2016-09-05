//custom_attributes.service.js
angular.module("brandqastApp")
.service("CustomAttributes", function($http) {
  this.getCustomAttributes = function() {
    return $http.get("/api/v1/custom_attributes").
      then(function(response) {
        return response;
      });
  };
  this.getCustomAttribute = function(custom_attribute_id) {
    return $http.get("/api/v1/custom_attributes/" + custom_attribute_id).
      then(function(response) {
        return response;
      });
  };
  this.createCustomAttribute = function(custom_attribute) {
    return $http.post("/api/v1/custom_attributes", custom_attribute).
      then(function(response) {
        return response;
      });
  };
});
