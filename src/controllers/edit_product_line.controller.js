//edit_product_line.controller.js
angular.module("brandqastApp")
.controller("EditProductLineController", function($scope, $routeParams, $localStorage, Contacts) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  ProductLine.getProductLine($routeParams.productLineId).then(function(doc) {
      $scope.productLine = doc.data;
  }, function(response) {
      alert(response);
  });

  $scope.toggleEdit = function() {
      $scope.editMode = true;
      $scope.productLineFormUrl = "product-line-form.html";
  };

  $scope.back = function() {
    $scope.editMode = false;
    $scope.productLineFormUrl = "";
  };

  $scope.saveProductLine = function(productLine) {
    ProductLines.editProductLine(productLine);
    $scope.editMode = false;
    $scope.contactFormUrl = "";
  };

  $scope.deleteProductLine = function(contactId) {
    ProductLines.deleteProductLine(contactId);
  };
});
