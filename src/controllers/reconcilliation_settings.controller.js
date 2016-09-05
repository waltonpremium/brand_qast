//reconcilliation_settings.controller.js
angular.module("brandqastApp")
.controller("ReconcilliationSettingsController", function($scope, $localStorage) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
