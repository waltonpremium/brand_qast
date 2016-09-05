//widgets.controller.js
angular.module("brandqastApp")
.controller("WidgetsController", function(widgets, $scope, $localStorage) {
  $scope.widgets = [];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
