//list.controller.js
angular.module("brandqastApp")
.controller("ListController", function(list, $scope, $location, $localStorage) {
  $scope.list = list.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveList = function(list) {
    //FixMe: Implement saveList
    $localStorage.flash_message = "List (" + list._id + ") successfully saved.";

    $location.path("/settings/lists");

    console.log("save list not implemented");
  };
  $scope.deleteList = function(list) {
    //FixMe: Implement deleteList
    $localStorage.flash_message = "List (" + list._id + ") successfully deleted.";

    $location.path("/settings/lists");

    console.log("delete list not implemented");
  };
});
