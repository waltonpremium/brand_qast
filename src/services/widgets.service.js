//widgets.service.js
angular.module("brandqastApp")
.service("Widgets", function($http) {
  this.getWidgets = function() {
    return $http.get("/api/v1/widgets").
      then(function(response) {
        return response;
      });
  };
});
