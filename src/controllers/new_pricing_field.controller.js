//new_pricing_field.controller.js
angular.module("brandqastApp")
.controller("NewPricingFieldController", function($scope, $location, $localStorage, PricingFields) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.savePricingField = function(pricing_field) {
    PricingFields.createPricingField(pricing_field).then(function(doc) {
      $localStorage.flash_message = "Pricing field " + pricing_field.name + " was successfully created.";

      $location.path("/settings/pricing_fields");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your custom pricing field. Please try again.";
      }
    });
  };
});
