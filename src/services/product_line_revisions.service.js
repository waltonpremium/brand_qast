//product_line_revisions.service.js
angular.module("brandqastApp")
.service("ProductLineRevisions", function($http) {
  this.getProductLineRevisions = function(product_line_id) {
    return $http.get("/api/v1/product_lines/" + product_line_id + "/product_line_revisions").
      then(function(response) {
        return response;
      });
  };
  this.getProductLineRevision = function(product_line_revision_id) {
    return $http.get("/api/v1/product_line_revisions/" + product_line_revision_id).
      then(function(response) {
        return response;
      });
  };
  this.rollbackToProductLineRevision = function(product_line_revision_id) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/rollback").
      then(function(response) {
        return response;
      });
    };
});
