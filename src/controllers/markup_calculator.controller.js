//markup_calculator.controller.js
angular.module("brandqastApp")
.controller("MarkupCalculatorController", function($scope, markup_calculator, pricing_fields, $location, $localStorage, MarkupCalculators) {
  $scope.operators = ['Add', 'Subtract', 'Multiply', 'Divide', 'Markup', 'Markdown'];
  $scope.markup_calculator = markup_calculator.data;
  $scope.pricing_fields = pricing_fields.data;
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
    MarkupCalculatorControllers.saveMarkupCalculator(calculator).then(function(doc) {
      $localStorage.flash_message = "Calculator " + calculator.name + " was successfully saved.";

      $location.path("/settings/calculators");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your markup calculator. Please try again.";
      }
    });
  };
});
