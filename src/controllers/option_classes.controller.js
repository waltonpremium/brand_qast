//option_classes.controller.js
angular.module("brandqastApp")
.controller("OptionClassesController", function($scope, $localStorage) {
  $scope.option_classes = [];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
