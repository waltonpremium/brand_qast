//lists.service.js
angular.module("brandqastApp")
.service("Lists", function($http) {
  this.getLists = function() {
    return $http.get("/api/v1/lists").
      then(function(response) {
        return response;
      });
  };
  this.getList = function(list_id) {
    return $http.get("/api/v1/lists/" + list_id).
      then(function(response) {
        return response;
      });
  };
  this.createList = function(list) {
    return $http.post("/api/v1/lists", list).
      then(function(response) {
        return response;
      });
  };
});
