//custom_statuses.controller.js
angular.module("brandqastApp")
.controller("CustomStatusesController", function(custom_statuses, $scope, $location, $localStorage) {
  $scope.custom_statuses = custom_statuses.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.customStatusDetail = function(custom_status) {
    $location.path("/settings/custom_statuses/" + custom_status._id);
  };
});
