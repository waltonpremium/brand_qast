//new_list.controller.js
angular.module("brandqastApp")
.controller("NewListController", function($scope, $location, $localStorage, Lists) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveList = function(list) {
    $scope.errors = [];

    Lists.createList(list).then(function(doc) {
      $localStorage.flash_message = "List " + list.name + " was successfully created.";

      $location.path("/settings/lists");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your list. Please try again.";
      }
    });
  };
});
