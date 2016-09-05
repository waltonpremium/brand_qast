//rounding_calculator.service.js
angular.module("brandqastApp")
.service("RoundingCalculators", function($http) {
  this.getRoundingCalculators = function() {
    return $http.get("/api/v1/rounding_calculators").
      then(function(response) {
        return response;
      });
  };
  this.getRoundingCalculator = function(rounding_calculator_id) {
    return $http.get("/api/v1/rounding_calculators/" + rounding_calculator_id).
      then(function(response) {
        return response;
      });
  };
  this.createRoundingCalculator = function(rounding_calculator) {
    return $http.post("/api/v1/rounding_calculators", rounding_calculator).
      then(function(response) {
        return response;
      });
  };
  this.saveRoundingCalculator = function(rounding_calculator) {
    return $http.put("/api/v1/rounding_calculators", rounding_calculator).
      then(function(response) {
        return response;
      });
  };
});
