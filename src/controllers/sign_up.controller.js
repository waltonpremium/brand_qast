//sign_up.controller.js
angular.module("brandqastApp")
.controller("SignUpController", function($scope, Accounts, $localStorage, $location, AuthenticationServiceChannel) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.signUp = function(account) {
    Accounts.createAccount(account).then(function(doc) {
      if(doc.data.success) {
        var token = doc.data.token;
        var account = doc.data.account;
        var user = doc.data.user;

        Accounts.login(token, user);

        AuthenticationServiceChannel.accountSignedIn();

        var accountUrl = $location.protocol() + "://" + account.subdomain + "." + $location.host();
        $location.path(accountUrl);
      } else {
        alert("sign in failed");
      }
    }, function(response) {
        alert(response);
    });
  };
});
