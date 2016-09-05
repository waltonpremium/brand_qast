//main_nav.controller.js
angular.module("brandqastApp")
.controller("MainController", function($scope, $route, $location, $localStorage, Accounts, AuthenticationServiceChannel) {
  $scope.account = {};
  $scope.user = {};
  $scope.isAuthed = false;
  $scope.isLoggedIn = Accounts.isLoggedIn();
  $scope.$route = $route;
  $scope.flash_message = undefined;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  window.scope = $scope;

  Accounts.getAccount().then(function(doc) {
    $scope.account = doc.data;

    $scope.isAuthed = Accounts.isAuthed($scope.account);
  });

  if($scope.isLoggedIn) {
    $scope.user = Accounts.getAuthedUser();
  }

  $scope.logout = function() {
    Accounts.logout();

    AuthenticationServiceChannel.accountLoggedOut();

    $location.path("/");
  };

  AuthenticationServiceChannel.onAccountSignedIn($scope, function() {
    $scope.isAuthed = true;
    $scope.isLoggedIn = true;
  });
  AuthenticationServiceChannel.onAccountLoggedOut($scope, function() {
    $scope.isAuthed = false;
    $scope.isLoggedIn = false;
  });

});
