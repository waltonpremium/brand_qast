//pricing_fields.service.js
angular.module("brandqastApp")
.service("PricingFields", function($http) {
  this.getPricingFields = function() {
    return $http.get("/api/v1/pricing_fields").
      then(function(response) {
        return response;
      });
  };
  this.getPricingField = function(pricing_field_id) {
    return $http.get("/api/v1/pricing_fields/" + pricing_field_id).
      then(function(response) {
        return response;
      });
  };
  this.createPricingField = function(pricing_field) {
    return $http.post("/api/v1/pricing_fields", pricing_field).
      then(function(response) {
        return response;
      });
  };
});
