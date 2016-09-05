//location.controller.js
angular.module("brandqastApp")
.controller("LocationController", function(location, markup_calculators, $scope, $location, $localStorage) {
  $scope.location = location.data;
  $scope.markup_calculators = markup_calculators.data;
  
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveLocation = function(location) {
    //FixMe: Implement saveLocation
    $localStorage.flash_message = "Location (" + location._id + ") successfully saved.";

    $location.path("/settings/locations");

    console.log("save location not implemented");
  };
  $scope.deleteLocation = function(location) {
    //FixMe: Implement deleteLocation
    $localStorage.flash_message = "Location (" + location._id + ") successfully deleted.";

    $location.path("/settings/locations");

    console.log("delete location not implemented");
  };
});
