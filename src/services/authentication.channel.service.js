//apis.service.js
angular.module("brandqastApp")
.service('AuthenticationServiceChannel', function ($rootScope) {
    var ACCOUNT_LOGGED_OUT_MESSAGE,
      accountLoggedOut,
      onAccountLoggedOut,
      ACCOUNT_SIGNED_IN_MESSAGE,
      accountSignedIn,
      onAccountSignedIn;

    ACCOUNT_LOGGED_OUT_MESSAGE = 'accountLoggedOutMessage';
    accountLoggedOut = function() {
      $rootScope.$broadcast(ACCOUNT_LOGGED_OUT_MESSAGE);
    };
    onAccountLoggedOut = function($scope, handler) {
      $scope.$on(ACCOUNT_LOGGED_OUT_MESSAGE, function(event, message) {
        handler();
      });
    };
    ACCOUNT_SIGNED_IN_MESSAGE = 'accountSignedInMessage';
    accountSignedIn = function() {
      $rootScope.$broadcast(ACCOUNT_SIGNED_IN_MESSAGE);
    };
    onAccountSignedIn = function($scope, handler) {
      $scope.$on(ACCOUNT_SIGNED_IN_MESSAGE, function(event, message) {
        handler();
      });
    };
    return {
      accountLoggedOut: accountLoggedOut,
      onAccountLoggedOut: onAccountLoggedOut,
      accountSignedIn: accountSignedIn,
      onAccountSignedIn: onAccountSignedIn
    };
  }
);
