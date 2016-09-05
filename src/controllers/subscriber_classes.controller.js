//subscriber_classes.controller.js
angular.module("brandqastApp")
.controller("SubscriberClassesController", function(subscriber_classes, $scope, $location, $localStorage) {
  $scope.subscriber_classes = subscriber_classes.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.subscriberClassDetail = function(subscriber_class) {
    $location.path("/settings/subscriber_classes/" + subscriber_class._id);
  };
});
