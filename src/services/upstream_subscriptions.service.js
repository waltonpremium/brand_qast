//subscriptions.service.js
angular.module("brandqastApp")
.service("UpstreamSubscriptions", function($http) {
  this.getSubscriptions = function() {
    return $http.get("/api/v1/upstream_subscriptions").
      then(function(response) {
        return response;
      });
  };
});
