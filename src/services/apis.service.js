//apis.service.js
angular.module("brandqastApp")
.service("Apis", function($http) {
  this.getApis = function() {
    return $http.get("/api/v1/apis").
      then(function(response) {
        return response;
      });
  };
});
