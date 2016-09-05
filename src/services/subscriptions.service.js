//subscriptions.service.js
angular.module("brandqastApp")
.service("Subscriptions", function($http) {
  this.createSubscriptionRequest = function(account_id, subscription_request) {
    return $http.post("/api/v1/subscriptions/" + account_id + "/request", subscription_request).
      then(function(response) {
        return response;
      });
  };
  this.getSubscriptions = function() {
    return $http.get("/api/v1/subscriptions").
      then(function(response) {
        return response;
      });
  };
});
