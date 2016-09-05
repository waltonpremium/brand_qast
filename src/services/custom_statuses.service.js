//pricing_fields.service.js
angular.module("brandqastApp")
.service("CustomStatuses", function($http) {
  this.getCustomStatuses = function() {
    return $http.get("/api/v1/custom_statuses").
      then(function(response) {
        return response;
      });
  };
  this.getCustomStatus = function(custom_status_id) {
    return $http.get("/api/v1/custom_statuses/" + custom_status_id).
      then(function(response) {
        return response;
      });
  };
  this.createCustomStatus = function(custom_status) {
    return $http.post("/api/v1/custom_statuses", custom_status).
      then(function(response) {
        return response;
      });
  };
});
