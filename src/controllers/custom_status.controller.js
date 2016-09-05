//custom_status.controller.js
angular.module("brandqastApp")
.controller("CustomStatusController", function(custom_status, $scope, $localStorage) {
  $scope.custom_status = custom_status.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCustomStatus = function(custom_status) {
    //FixMe: Implement saveCustomStatus
    console.log("save custom status not implemented");
  };
});
