//accounts.service.js
angular.module("brandqastApp")
.service("Accounts", function($http, $window, $localStorage) {
  this.getAccount = function() {
    return $http.get("/api/v1/accounts").
      then(function(response) {
        return response;
      });
  };
  this.createAccount = function(account) {
    return $http.post("/api/v1/accounts", account).
      then(function(response) {
        return response;
      });
  };
  this.getUser = function(userId) {
    return $http.get("/api/v1/users/" + userId).
      then(function(response) {
        return response;
      });
  };
  this.authenticate = function(username, password) {
    return $http.post("/api/v1/sessions", { "username": username, "password": password }).
      then(function(response) {
        return response;
      });
    };
  this.login = function(token, user) {
    $localStorage.token = token;
    $localStorage.user = user;
  };
  this.getToken = function() {
    return $localStorage.token;
  };
  this.getUserId = function() {
    return $localStorage.user._id;
  };
  this.isAuthed = function(account) {
    if(this.isLoggedIn) {
      var user = $localStorage.user;

      if(user._account._id == account._id)
        return true;
      else
        return false;
    }

    return false;
  };
  this.isLoggedIn = function() {
    var token = $localStorage.token;
    if(token) {
      var params = this.parseJwt(token);

      //return Math.round(new Date().getTime() / 1000) <= params.exp;
      return true;
    } else {
      return false;
    }
  };
  this.getAuthedUser = function() {
    return $localStorage.user;
  };
  this.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  };
  this.logout = function() {
    $localStorage.$reset();
  };
  this.saveCompany = function(account, company) {
    return $http.put("/api/v1/accounts/" + account._id + "/company", company).
      then(function(response) {
        return response;
      });
  };
  this.saveMainOfficeLocation = function(account, main_office_location) {
    return $http.put("/api/v1/accounts/" + account._id + "/main_office_location", main_office_location).
      then(function(response) {
        return response;
      });
  };
  this.saveBranding= function(account, branding) {
    return $http.put("/api/v1/accounts/" + account._id + "/branding", branding).
      then(function(response) {
        return response;
      });
  };
  this.saveSocialMedia = function(account, social_media) {
    return $http.put("/api/v1/accounts/" + account._id + "/social_media", social_media).
      then(function(response) {
        return response;
      });
  };
  this.saveAccountProfile = function(account, profile) {
    return $http.put("/api/v1/accounts/" + account._id + "/profile", profile).
      then(function(response) {
        return response;
      });
  };
  this.saveAccountPrimaryContact = function(account, primary_contract) {
    return $http.put("/api/v1/accounts/" + account._id + "/primary_contact", primary_contract).
      then(function(response) {
        return response;
      });
  };
  this.saveBillingAddress = function(account, billing_address) {
    return $http.put("/api/v1/accounts/" + account._id + "/billing_address", billing_address).
      then(function(response) {
        return response;
      });
  };
  this.saveTerminology = function(account, terms) {
    return $http.put("/api/v1/accounts/" + account._id + "/terminology", terms).
      then(function(response) {
        return response;
      });
  };
  this.saveDefaults = function(account, defaults) {
    return $http.put("/api/v1/accounts/" + account._id + "/defaults", defaults).
      then(function(response) {
        return response;
      });
  };
  this.createBilling = function(account) {
    return $http.post("/api/v1/accounts/" + account._id + "/billing").
      then(function(response) {
        return response;
      });
  };
});
