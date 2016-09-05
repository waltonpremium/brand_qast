//company.controller.js
angular.module("brandqastApp")
.controller("CompanyController", function($scope, account, $localStorage, Accounts) {
  $scope.account = account.data;
  $scope.account.branding = $scope.account.branding || {};

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCompany = function(company) {
    $scope.errors = [];

    Accounts.saveCompany($scope.account, company).then(function(company) {
      $scope.account.company = company.data;

      $scope.flash_message = "Company profile saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your company profile. Please try again.";
      }
    });
  };
  $scope.saveMainOfficeLocation = function(main_office_location) {
    $scope.errors = [];

    Accounts.saveMainOfficeLocation($scope.account, main_office_location).then(function(main_office_location) {
      $scope.account.main_office_location = main_office_location.data;

      $scope.flash_message = "Main office location saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your main office location. Please try again.";
      }
    });
  };
  $scope.saveBranding = function(branding) {
    $scope.errors = [];

    Accounts.saveBranding($scope.account, branding).then(function(branding) {
      $scope.account.branding = branding.data;

      $scope.flash_message = "Branding and logos saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your company branding. Please try again.";
      }
    });
  };
  $scope.saveSocialMedia = function(social_media) {
    $scope.errors = [];

    Accounts.saveSocialMedia($scope.account, social_media).then(function(social_media) {
      $scope.account.social_media = social_media.data;

      $scope.flash_message = "Social accounts saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your social media accounts. Please try again.";
      }
    });
  };
});
