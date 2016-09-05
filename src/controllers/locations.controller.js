//locations.controller.js
angular.module("brandqastApp")
.controller("LocationsController", function(locations, $scope, $location, $localStorage) {
  $scope.locations = locations.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.locationDetail = function(location) {
    $location.path("/settings/locations/" + location._id);
  };
});
