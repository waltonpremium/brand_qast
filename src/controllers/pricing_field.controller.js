//pricing_field.controller.js
angular.module("brandqastApp")
.controller("PricingFieldController", function(pricing_field, $scope, $localStorage) {
  $scope.pricing_field = pricing_field.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.savePricingField = function(list) {
    //FixMe: Implement savePricingField
    console.log("save pricing field not implemented");
  };
});
