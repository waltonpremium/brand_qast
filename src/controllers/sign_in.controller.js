//sign_in.controller.js
angular.module("brandqastApp")
.controller("SignInController", function($scope, $location, $localStorage, Accounts, AuthenticationServiceChannel) {
  $scope.signIn = function(username, password) {
    if($localStorage.flash_message) {
      $scope.flash_message = $localStorage.flash_message;
      $localStorage.flash_message = undefined;
    }
    Accounts.authenticate(username, password).then(function(doc) {
      if(doc.data.success) {
        var token = doc.data.token;
        var userId = doc.data.user_id;

        Accounts.getUser(userId).then(function(doc) {
          var user = doc.data;
          Accounts.login(token, user);

          AuthenticationServiceChannel.accountSignedIn();

          var accountUrl = "/accounts/" + user._account._id;
          $location.path(accountUrl);
        });

      } else {
        alert("sign in failed");
      }
    }, function(response) {
        alert(response);
    });
  };
});
