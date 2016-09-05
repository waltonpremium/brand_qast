//apis.controller.js
angular.module("brandqastApp")
.controller("ApisController", function(apis, $scope, $localStorage) {
  $scope.apis = [];

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
