//new_product_line.controller.js
angular.module("brandqastApp")
.controller("NewProductLineController", function($scope, $location, $localStorage, ProductLines) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.back = function() {
    $location.path("#/");
  };

  $scope.saveProductLine = function(productLine) {
    $scope.errors = [];
    
    ProductLines.createProductLine(productLine).then(function(doc) {
        var productLineUrl = "/product_lines/" + doc.data._id;

        $location.path(productLineUrl);
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your product line. Please try again.";
      }
    });
  };
});
