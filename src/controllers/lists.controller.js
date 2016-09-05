//lists.controller.js
angular.module("brandqastApp")
.controller("ListsController", function(lists, $scope, $location, $localStorage) {
  $scope.lists = lists.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.listDetail = function(list) {
    $location.path("/settings/lists/" + list._id);
  };
});
