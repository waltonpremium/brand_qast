//pricing_fields.controller.js
angular.module("brandqastApp")
.controller("PricingFieldsController", function(pricing_fields, $scope, $location, $localStorage) {
  $scope.pricing_fields = pricing_fields.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.pricingFieldDetail = function(pricing_field) {
    $location.path("/settings/pricing_fields/" + pricing_field._id);
  };
});
