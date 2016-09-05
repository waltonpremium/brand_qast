//calculators.controller.js
angular.module("brandqastApp")
.controller("CalculatorsController", function($scope, markup_calculators, rounding_calculators, $location,$localStorage) {
  $scope.rounding_calculators = rounding_calculators.data;
  $scope.markup_calculators = markup_calculators.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.roundingCalculatorDetail = function(rounding_calculator) {
    $location.path("/settings/rounding_calculators/" + rounding_calculator._id);
  };
  $scope.markupCalculatorDetail = function(markup_calculator) {
    $location.path("/settings/markup_calculators/" + markup_calculator._id);
  };
});
