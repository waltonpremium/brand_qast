//new_subscriber_class.controller.js
angular.module("brandqastApp")
.controller("NewSubscriberClassController", function($scope, markup_calculators, SubscriberClasses, $location, $localStorage) {
  $scope.markup_calculators = markup_calculators.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveSubscriberClass = function(subscriber_class) {
    SubscriberClasses.createSubscriberClass(subscriber_class).then(function(doc) {
      $localStorage.flash_message = "Subscriber class " + subscriber_class.name + " was successfully created.";

      $location.path("/settings/subscriber_classes");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your subscriber class. Please try again.";
      }
    });
  };
});
