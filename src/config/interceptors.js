angular.module("brandqastApp")
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q, $location, $localStorage) {
      return {
        'request': function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
              config.headers.Authorization = $localStorage.token;
          }
          return config;
        },
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
              $location.path('/signin');
          }
          return $q.reject(response);
        }
      };
    });
  });
