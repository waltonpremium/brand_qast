//new_markup_calculator.controller.js
angular.module("brandqastApp")
.controller("NewMarkupCalculatorController", function($scope, $location, $localStorage, pricing_fields, rounding_calculators, MarkupCalculators) {
  $scope.pricing_fields = pricing_fields.data;
  $scope.rounding_calculators = rounding_calculators.data;

  $scope.markup_calculator = {
    name: "",
    rules: []
  };
  $scope.pricing_fields.forEach(function(pricing_field) {
    $scope.markup_calculator.rules.push({
      is_manual: true,
      destination_pricing_field: pricing_field,
      pricing_rules: [{
        operation: "",
        amount: "",
        order: 1
      }]
    });
  });

  $scope.operators = ['Add', 'Subtract', 'Multiply', 'Divide', 'Markup', 'Markdown'];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.addPricingRule = function(rule) {
    rule.pricing_rules.push({
      operation: "",
      amount: "",
      order: rule.pricing_rules.length + 1
    });
  };
  $scope.saveMarkupCalculator = function(markup_calculator) {
    MarkupCalculators.createMarkupCalculator(markup_calculator).then(function(doc) {
      $localStorage.flash_message = "Markup calculator " + markup_calculator.name + " was successfully created.";

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
