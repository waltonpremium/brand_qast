//new_product.controller.js
angular.module("brandqastApp")
.controller("NewProductController", function(product_line, product_line_revision, custom_attributes, custom_statuses, pricing_fields, $scope, $location, $routeParams, $localStorage, Products) {
  $scope.product_line = product_line.data;
  $scope.product_line_revision = product_line_revision.data;
  $scope.custom_attributes = custom_attributes.data;
  $scope.custom_statuses = custom_statuses.data;
  $scope.pricing_fields = pricing_fields.data;
  $scope.product = {
    product_copy: {},
    lists: [],
    locations: [],
    subscriber_classes: [],
    pricing: []
  };
  $scope.pricing = [];
  $scope.pricing_fields.forEach(function(pricing_field) {
    $scope.product.pricing.forEach(function(product_pricing) {
      $scope.pricing[product_pricing.pricing_field] = 0.00;
    });
  });
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }


  $scope.back = function() {
    $location.path("#/");
  };
  $scope.nextProduct = function() {

  };
  $scope.list_checked = function(list) {
    if($scope.product.lists.includes(list._id)) {
      $scope.product.lists.splice($scope.product.lists.indexOf(list._id), 1);
    } else {
      $scope.product.lists.push(list._id);
    }
  };
  $scope.location_checked = function(location) {
    if($scope.product.locations.includes(location._id)) {
      $scope.product.locations.splice($scope.product.locations.indexOf(location._id), 1);
    } else {
      $scope.product.locations.push(location._id);
    }
  };
  $scope.subscriber_class_checked = function(subscriber_class) {
    if($scope.product.subscriber_classes.includes(subscriber_class._id)) {
      $scope.product.subscriber_classes.splice($scope.product.subscriber_classes.indexOf(subscriber_class._id), 1);
    } else {
      $scope.product.subscriber_classes.push(subscriber_class._id);
    }
  };
  $scope.saveProduct = function(product) {
    $scope.pricing_fields.forEach(function(pricing_field) {
      var found = false;
      product.pricing.forEach(function(product_pricing) {
        if(product_pricing.pricing_field == pricing_field._id) {
          product_pricing.value = $scope.pricing[pricing_field._id];

          found = true;
        }
      });
      if(!found) {
        var product_pricing = {};
        product_pricing.pricing_field = pricing_field._id;
        product_pricing.value = $scope.pricing[pricing_field._id];

        product.pricing.push(product_pricing);
      }
    });
    Products.createProduct($routeParams.product_line_revision_id, product).then(function(doc) {
      $localStorage.flash_message = product.name + " was successfully created.";

      var productUrl = "/product_lines/" + $scope.product_line._id + "/product_line_revisions/" + $scope.product_line_revision._id + "/products/" + doc.data._id;

      $location.path(productUrl);
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your product. Please try again.";
      }
    });
  };
});
