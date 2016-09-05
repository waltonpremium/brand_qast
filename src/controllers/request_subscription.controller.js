//request_subscription.controller.js
angular.module("brandqastApp")
.controller("RequestSubscriptionController", function(Accounts, Subscriptions, $scope, $routeParams, $localStorage) {
  $scope.subscribe = function(subscription_request) {
    if($localStorage.flash_message) {
      $scope.flash_message = $localStorage.flash_message;
      $localStorage.flash_message = undefined;
    }
    Subscriptions.createSubscriptionRequest($routeParams.account_id, subscription_request).then(function(doc) {
      alert("Subscription Request Created");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your subscription request. Please try again.";
      }
    });
  };
});
