//product_lines_list.service.js
angular.module("brandqastApp")
.controller("ProductLinesListController", function(product_lines, Accounts, $scope, $localStorage) {
  $scope.product_lines = product_lines.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
