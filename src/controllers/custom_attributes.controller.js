//custom_attributes.controller.js
angular.module("brandqastApp")
.controller("CustomAttributesController", function(custom_attributes, $scope, $location, $localStorage) {
  $scope.custom_attributes = custom_attributes.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.customAttributeDetail = function(custom_attribute) {
    $location.path("/settings/custom_attributes/" + custom_attribute._id);
  };
});
