//subscriber_class.controller.js
angular.module("brandqastApp")
.controller("SubscriberClassController", function(subscriber_class, markup_calculators, $scope, $location, $localStorage) {
  $scope.subscriber_class = subscriber_class.data;
  $scope.markup_calculators = markup_calculators.data;
  
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveSubscriberClass = function(subscriber_class) {
    //FixMe: Implement saveSubscriberClass
    $localStorage.flash_message = "Subscriber Class (" + subscriber_class.name + ") successfully saved.";

    $location.path("/settings/subscriber_classes");

    console.log("save subscriber class not implemented");
  };
  $scope.deleteSubscriberClass = function(subscriber_class) {
    //FixMe: Implement deleteSubscriberClass
    $localStorage.flash_message = "Subscriber Class (" + subscriber_class.name + ") successfully deleted.";

    $location.path("/settings/subscriber_classes");

    console.log("delete subscriber class not implemented");
  };
});
