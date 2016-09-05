//profile.controller.js
angular.module("brandqastApp")
.controller("ProfileController", function($scope, user, $localStorage) {
  $scope.user = user;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveUser = function(user) {

  };
});
