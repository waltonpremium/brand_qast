//account.controller.js
angular.module("brandqastApp")
.controller("AccountController", function($scope, account, billing, Accounts, Billings, $localStorage) {
  $scope.account = account.data;
  $scope.billing = billing.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  if(!$scope.billing) {
    Accounts.createBilling($scope.account). then(function(billing) {
      $scope.billing = billing;
    }, function(response) {
      console.log("error: " + response);
      //FixMe: handle error better
      $scope.flash_message = "Sorry, an error occurred. Please try again.";
    });
  }
  $scope.saveProfile = function(profile) {
    $scope.errors = [];

    Accounts.saveAccountProfile($scope.account, profile).then(function(doc) {
      var account = doc.data;
      $scope.account.name = account.name;
      $scope.account.subdomain = account.subdomain;

      $scope.flash_message = "Account profile saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your account profile. Please try again.";
      }
    });
  };
  $scope.savePrimaryContact = function(primary_contact) {
    Accounts.saveAccountPrimaryContact($scope.account, primary_contact).then(function(primary_contact) {
      $scope.account.primary_contact = primary_contact.data;

      $scope.flash_message = "Primary contact saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your primary contact. Please try again.";
      }
    });
  };
  $scope.saveBillingAddress = function(billing_address) {
    Billings.saveBillingAddress($scope.billing, billing_address).then(function(billing_address) {
      $scope.billing.billing_address = billing_address.data;

      $scope.flash_message = "Billing address saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your billing address. Please try again.";
      }

    });
  };
});
