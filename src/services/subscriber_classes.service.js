//subscriber_classes.service.js
angular.module("brandqastApp")
.service("SubscriberClasses", function($http) {
  this.getSubscriberClasses = function() {
    return $http.get("/api/v1/subscriber_classes").
      then(function(response) {
        return response;
      });
  };
  this.getSubscriberClass = function(subscriber_class_id) {
    return $http.get("/api/v1/subscriber_classes/" + subscriber_class_id).
      then(function(response) {
        return response;
      });
  };
  this.createSubscriberClass = function(subscriber_class) {
    return $http.post("/api/v1/subscriber_classes", subscriber_class).
      then(function(response) {
        return response;
      });
  };
  this.deleteSubscriberClass = function(subscriber_class) {
    return $http.delete("/api/v1/subscriber/" + subscriber_class._id).
      then(function(response) {
        return response;
      });
  };
});
