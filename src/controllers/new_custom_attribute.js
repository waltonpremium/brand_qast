//new_custom_attribute.controller.js
angular.module("brandqastApp")
.controller("NewCustomAttributeController", function($scope, $localStorage, CustomAttributes) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.custom_attribute = {
    group_name: "",
    attributes: [{
      name: "",
      default_value: "",
      sample_value: ""
    }]
  };
  $scope.addAttribute = function() {
    $scope.custom_attribute.attributes.push({
      name: "",
      default_value: "",
      sample_value: ""
    });
  };
  $scope.saveCustomAttribute = function(custom_attribute) {
    $scope.errors = [];
    
    CustomAttributes.createCustomAttribute(custom_attribute).then(function(doc) {
      $localStorage.flash_message = "Custom attribute " + custom_attribute.name + " was successfully created.";

      $location.path("/settings/custom_attributes");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your custom attribute. Please try again.";
      }
    });
  };
});
