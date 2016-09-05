//product_line_revision_history.controller.js
angular.module("brandqastApp")
.controller("ProductLineRevisionHistoryController", function($scope, product_line, product_line_revisions, ProductLineRevisions, $localStorage) {
  $scope.product_line = product_line.data;
  $scope.product_line_revisions = product_line_revisions.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.rollback = function(product_line_revision) {
    ProductLineRevisions.rollbackToProductLineRevision(product_line_revision._id).then(function(doc) {
      var productLineUrl = "/product_lines/" + doc.data._id;

      $location.path(productLineUrl);
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred rolling back your product line. Please try again.";
      }
    });
  };
});
