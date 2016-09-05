//pull_requests.service.js
angular.module("brandqastApp")
.service("PullRequests", function($http) {
  this.getPullRequests = function() {
    return $http.get("/api/v1/pull_requests").
      then(function(response) {
        return response;
      });
  };
});
