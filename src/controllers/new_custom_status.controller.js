//new_custom_status.controller.js
angular.module("brandqastApp")
.controller("NewCustomStatusController", function($scope, $location, $localStorage, CustomStatuses) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCustomStatus = function(custom_status) {
    CustomStatuses.createCustomStatus(custom_status).then(function(doc) {
      $localStorage.flash_message = "Custom status " + custom_status.name + " was successfully created.";

      $location.path("/settings/custom_statuses");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your custom status. Please try again.";
      }
    });
  };
});
