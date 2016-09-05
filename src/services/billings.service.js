//billings.service.js
angular.module("brandqastApp")
.service("Billings", function($http) {
  this.getBilling = function() {
    return $http.get("/api/v1/billing").
      then(function(response) {
        return response;
      });
  };
  this.saveBillingAddress = function(billing, billing_address) {
    return $http.put("/api/v1/billing/" + billing._id + "/billing_address", billing_address).
      then(function(response) {
        return response;
      });
  };
});
