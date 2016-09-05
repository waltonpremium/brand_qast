//product_lines.service.js
angular.module("brandqastApp")
.service("ProductLines", function($http) {
  this.getProductLine = function(product_line_id) {
    return $http.get("/api/v1/product_lines/" + product_line_id).
      then(function(response) {
        return response;
      });
  };
  this.getProductLines = function() {
    return $http.get("/api/v1/product_lines").
      then(function(response) {
        return response;
      });
  };
  this.createProductLine = function(productLine) {
    return $http.post("/api/v1/product_lines", productLine).
      then(function(response) {
        return response;
      });
  };
  this.commit = function(product_line_id) {
    return $http.post("/api/v1/product_lines/" + product_line_id + "/clone").
      then(function(response) {
        return response;
      });
  };
  this.syndicate = function(product_line_id) {
    return $http.post("/api/v1/product_lines/" + product_line_id + "/syndicate").
      then(function(response) {
        return response;
      });
  };
});
