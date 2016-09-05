//terminology.controller.js
angular.module("brandqastApp")
.controller("TerminologyController", function($scope, $localStorage, Accounts) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveTerminology = function(terms) {
    Accounts.saveTerminology($scope.account, terms).then(function(doc) {
      $scope.account.terms = doc.data;

      $scope.flash_message = "Terminology saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your terminology. Please try again.";
      }

    });
  };
});
