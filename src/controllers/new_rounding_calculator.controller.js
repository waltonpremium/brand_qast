//new_rounding_calculator.controller.js
angular.module("brandqastApp")
.controller("NewRoundingCalculatorController", function($scope, $location, $localStorage, RoundingCalculators) {
  $scope.rounding_options = ["Up", "Down"];
  $scope.rounding_amounts = ["0.10", "1.00", "10.00", "100.00", "1000.00", "10000.00"];
  $scope.calculator = {
    name: "",
    rules: [{
      min_price: "",
      max_price: "",
      rounding_option: "",
      rounding_amount: "",
      adjustment_amount: ""
    }]
  };
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

    RoundingCalculators.createRoundingCalculator(calculator).then(function(doc) {
      $localStorage.flash_message = "Calculator " + calculator.name + " was successfully created.";

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
