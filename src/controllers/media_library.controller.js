//media_library.controller.js
angular.module("brandqastApp")
.controller("MediaLibraryController", function($scope, $localStorage) {
  $scope.media = [];

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
