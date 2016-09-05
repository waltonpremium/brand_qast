//downstream_subscriptions.controller.js
angular.module("brandqastApp")
.controller("DownstreamSubscriptionsController", function(subscriptions, $scope, $localStorage) {
  $scope.subscriptions = subscriptions.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
