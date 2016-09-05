//lists.controller.js
angular.module("brandqastApp")
.controller("PullRequestsController", function(pull_requests, $scope, $localStorage) {
  $scope.pull_requests = pull_requests.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});
