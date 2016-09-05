//new_location.controller.js
angular.module("brandqastApp")
.controller("NewLocationController", function($scope, $location, markup_calculators, $localStorage, Locations) {
  $scope.location = {
    address: {},
    contact: {}
  };
  $scope.markup_calculators = markup_calculators.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveLocation = function(location) {
    $scope.errors = [];

    Locations.createLocation(location).then(function(doc) {
      $localStorage.flash_message = "Location " + location.name + " was successfully created.";

      $location.path("/settings/locations");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your location. Please try again.";
      }
    });
  };
});
