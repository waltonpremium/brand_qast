//markup_calculator.service.js
angular.module("brandqastApp")
.service("MarkupCalculators", function($http) {
  this.getMarkupCalculators = function() {
    return $http.get("/api/v1/markup_calculators").
      then(function(response) {
        return response;
      });
  };
  this.getMarkupCalculator = function(markup_calculator_id) {
    return $http.get("/api/v1/markup_calculators/" + markup_calculator_id).
      then(function(response) {
        return response;
      });
  };
  this.createMarkupCalculator = function(markup_calculator) {
    return $http.post("/api/v1/markup_calculators", markup_calculator).
      then(function(response) {
        return response;
      });
  };
  this.saveMarkupCalculator = function(markup_calculator) {
    return $http.put("/api/v1/markup_calculators", markup_calculator).
      then(function(response) {
        return response;
      });
  };
});
