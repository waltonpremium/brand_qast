//rounding_calculator.controller.js
angular.module("brandqastApp")
.controller("RoundingCalculatorController", function($scope, rounding_calculator, $location, $localStorage, RoundingCalculators) {
  $scope.calculator = rounding_calculator.data;
  $scope.rounding_options = ["Up", "Down"];
  $scope.rounding_amounts = ["0.10", "1.00", "10.00", "100.00", "1000.00", "10000.00"];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.addRoundingRule = function() {
    $scope.calculator.rules.push({
      min_price: "",
      max_price: "",
      rounding_option: "",
      rounding_amount: "",
      adjustment_amount: ""
    });
  };
  $scope.saveRoundingCalculator = function(calculator) {
    $scope.errors = [];

    RoundingCalculators.saveRoundingCalculator(calculator).then(function(doc) {
      $localStorage.flash_message = "Calculator " + calculator.name + " was successfully saved.";

      $location.path("/settings/calculators");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your rounding calculator. Please try again.";
      }
    });
  };
});
