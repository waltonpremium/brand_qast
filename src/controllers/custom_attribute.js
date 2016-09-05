//custom_attribute.controller.js
angular.module("brandqastApp")
.controller("CustomAttributeController", function(custom_attribute, $scope, $localStorage, $location) {
  $scope.custom_attribute = custom_attribute.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCustomAttribute = function(custom_attribute) {
    $localStorage.flash_message = "Custom Attribute (" + custom_attribute.group_name + ") successfully saved.";

    $location.path("/settings/custom_attributes");

    console.log("Save Custom Attribute");
  };
});
