//terminology.controller.js
angular.module("brandqastApp")
.controller("DefaultsController", function($scope, $localStorage, Accounts) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveDefaults = function(defaults) {
    Accounts.saveDefaults($scope.account, defaults).then(function(doc) {
      $scope.account.defaults = doc.data;

      $scope.flash_message = "Defaults saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your defaults. Please try again.";
      }

    });
  };
});
