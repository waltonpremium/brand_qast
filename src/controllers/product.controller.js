//product.controller.js
angular.module("brandqastApp")
.controller("ProductController", function(product_line, product_line_revision, product, custom_attributes, custom_statuses, pricing_fields, $scope, $routeParams, $location, $localStorage, Products, Upload) {

  // $scope.product_line_revision.products.some(function(product, index) {
  //   if($scope.product._id == product._id) {
  //     $scope.product_index = index;
  //     return true;
  //   }
  // });

  init = function() {
    $scope.product_line = product_line.data;
    $scope.product_line_revision = product_line_revision.data;
    $scope.product = product.data;
    $scope.custom_statuses = custom_statuses.data;
    $scope.pricing_fields = pricing_fields.data;
    $scope.form = {};
    $scope.file = {};

    $scope.product_index = 0;
    $scope.pricing = [];
    $scope.pricing_fields.forEach(function(pricing_field) {
      $scope.product.pricing.forEach(function(product_pricing) {
        $scope.pricing[product_pricing.pricing_field] = product_pricing.value;
      });
    });
    if($localStorage.flash_message) {
      $scope.flash_message = $localStorage.flash_message;
      $localStorage.flash_message = undefined;
    }
    $scope.chunkedMedia = chunk($scope.product.media, 3);

    initLocationPricing();
    initSubscriberClassPricing();
  };
  initLocationPricing = function() {
    $scope.product_location_editing = [];
    $scope.product_location_pricing = [];
    $scope.product_location_current_edit = {
      row_index: -1,
      column_index: -1
    };
    for (var i=0; i<$scope.product.locations.length; i++) {
      var editing = [];
      var pricing = [];
      for (var j=0; j<$scope.product_line_revision.pricing_fields.length; j++) {
        editing.push(false);
        var price = $scope.getPrice($scope.product.locations[i].pricing, $scope.product_line_revision.pricing_fields[j]);
        console.log("price " + price);
        pricing.push(price);
      }
      $scope.product_location_editing.push(editing);
      $scope.product_location_pricing.push(pricing);
    }
  };
  initSubscriberClassPricing = function() {
    $scope.product_subscriber_class_editing = [];
    $scope.product_subscriber_class_pricing = [];
    $scope.product_subscriber_class_current_edit = {
      row_index: -1,
      column_index: -1
    };
    for (var i=0; i<$scope.product.subscriber_classes.length; i++) {
      var editing = [];
      var pricing = [];
      for (var j=0; j<$scope.product_line_revision.pricing_fields.length; j++) {
        editing.push(false);
        var price = $scope.getPrice($scope.product.subscriber_classes[i].pricing, $scope.product_line_revision.pricing_fields[j]);
        console.log("price " + price);
        pricing.push(price);
      }
      $scope.product_subscriber_class_editing.push(editing);
      $scope.product_subscriber_class_pricing.push(pricing);
    }
  };
  function chunk(arr, size) {
    var newArr = [];
    if(arr) {
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
    }
    return newArr;
  }
  $scope.getPrice = function(pricing, pricing_field) {
    for (var i=0; i<pricing.length; i++) {
      if(pricing[i].pricing_field == pricing_field._id) {
        return pricing[i].value;
      }
    }
    return 0.00;
  };
  $scope.isEditingLocation = function(row_index, column_index) {
    return $scope.product_location_editing[row_index][column_index];
  };
  $scope.locationPriceCellClicked = function(row_index, column_index) {
    if($scope.product_location_current_edit.column_index > -1 && $scope.product_location_current_edit.row_index > -1) {
      $scope.product_location_editing[$scope.product_location_current_edit.row_index][$scope.product_location_current_edit.column_index] = false;
    }
    $scope.product_location_current_edit.row_index = row_index;
    $scope.product_location_current_edit.column_index = column_index;

    $scope.product_location_editing[row_index][column_index] = !$scope.product_location_editing[row_index][column_index];
  };
  $scope.isEditingSubscriberClass = function(row_index, column_index) {
    return $scope.product_subscriber_class_editing[row_index][column_index];
  };
  $scope.subscriberClassPriceCellClicked = function(row_index, column_index) {
    if($scope.product_subscriber_class_current_edit.column_index > -1 && $scope.product_subscriber_class_current_edit.row_index > -1) {
      $scope.product_subscriber_class_editing[$scope.product_subscriber_class_current_edit.row_index][$scope.product_subscriber_class_current_edit.column_index] = false;
    }
    $scope.product_subscriber_class_current_edit.row_index = row_index;
    $scope.product_subscriber_class_current_edit.column_index = column_index;

    $scope.product_subscriber_class_editing[row_index][column_index] = !$scope.product_subscriber_class_editing[row_index][column_index];
  };
  $scope.nextProduct = function() {
    $scope.product_index += 1;
    if($scope.product_index > $scope.product_line_revision.products.length - 1) {
      $scope.product_index = 0;
    }
    $scope.product = $scope.product_line_revision.products[$scope.product_index];
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
    Products.updateProduct($routeParams.product_line_revision_id, product).then(function(doc) {
      $localStorage.flash_message = product.name + " was successfully updated.";

      var productUrl = "/product_lines/" + $scope.product_line._id + "/product_line_revisions/" + $scope.product_line_revision._id;
      $location.path(productUrl);
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your product. Please try again.";
      }
    });
  };
  $scope.deactivateProduct = function(product) {
    Products.deleteProduct($routeParams.product_line_revision_id, product).then(function(doc) {
      alert("Product inactived");
    }, function(response) {
      alert(response);
    });
  };
  $scope.activateProduct = function(product) {
    Products.activateProduct($routeParams.product_line_revision_id, product).then(function(doc) {
      alert("Product actived");
    }, function(response) {
      alert(response);
    });
  };
  $scope.addProductToList = function(list_id) {
    Products.addProductToList($routeParams.product_line_revision_id, $scope.product, list_id).then(function(doc) {
      $scope.product.lists.push(list_id);
    }, function(response) {
      alert(response);
    });
  };
  $scope.removeProductFromList = function(list_id) {
    Products.removeProductFromList($routeParams.product_line_revision_id, $scope.product, list_id).then(function(doc) {
      var index = $scope.product.lists.indexOf(list_id);
      if(index != -1) {
        array.splice(index, 1);
      }
    }, function(response) {
      alert(response);
    });
  };
  $scope.addProductToLocation = function(location_id) {
    Products.addProductToLocation($routeParams.product_line_revision_id, $scope.product, location_id).then(function(doc) {
      $scope.product.locations.push(location_id);
    }, function(response) {
      alert(response);
    });
  };
  $scope.removeProductFromLocation = function(location_id) {
    Products.removeProductFromLocation($routeParams.product_line_revision_id, $scope.product, location_id).then(function(doc) {
      var index = $scope.product.locations.indexOf(location_id);
      if(index != -1) {
        array.splice(index, 1);
      }
    }, function(response) {
      alert(response);
    });
  };
  $scope.addProductToSubscriberClass = function(subscriber_class_id) {
    Products.addProductToSubscriberClass($routeParams.product_line_revision_id, $scope.product, subscriber_class_id).then(function(doc) {
      $scope.product.subscriber_classes.push(subscriber_class_id);
    }, function(response) {
      alert(response);
    });
  };
  $scope.removeProductFromSubscriberClass = function(subscriber_class_id) {
    Products.removeProductFromSubscriberClass($routeParams.product_line_revision_id, $scope.product, subscriber_class_id).then(function(doc) {
      var index = $scope.product.subscriber_classes.indexOf(subscriber_class_id);
      if(index != -1) {
        array.splice(index, 1);
      }
    }, function(response) {
      alert(response);
    });
  };
  $scope.is_list_checked = function(list) {
    return $scope.product.lists.includes(list._id);
  };
  $scope.list_checked = function(list) {
    if($scope.product.lists.includes(list._id)) {
      $scope.removeProductFromList(list._id);
    } else {
      $scope.addProductToList(list._id);
    }
  };
  $scope.is_location_checked = function(location) {
    var result = false;
    $scope.product.locations.forEach(function(product_location) {
      if(product_location.location._id == location._id) {
        result = true;
      }
    });

    return result;
  };
  $scope.location_checked = function(location) {
    if($scope.product.locations.includes(location._id)) {
      $scope.removeProductFromLocation(location._id);
    } else {
      $scope.addProductToLocation(location._id);
    }
  };
  $scope.is_subscriber_class_checked = function(subscriber_class) {
    var result = false;
    $scope.product.subscriber_classes.forEach(function(product_subscriber_class) {
      if(product_subscriber_class.subscriber_class) {
        if(product_subscriber_class.subscriber_class._id == subscriber_class._id) {
          result = true;
        }
      }
    });

    return result;
  };
  $scope.subscriber_class_checked = function(subscriber_class) {
    if($scope.product.subscriber_classes.includes(subscriber_class._id)) {
      $scope.removeProductFromSubscriberClass(subscriber_class._id);
    } else {
      $scope.addProductToSubscriberClass(subscriber_class._id);
    }
  };
  $scope.submit = function(is_primary) {
    console.log("we are uploading a file!");
    if ($scope.form.file.$valid && $scope.file) {
      $scope.upload($scope.file, is_primary);
    }
  };
  $scope.updateProductSubscriberClassPrice = function(product, subscriber_class, pricing_field, product_index, index) {
    Products.updateProductSubscriberClassPricing($routeParams.product_line_revision_id, product, subscriber_class, pricing_field, $scope.product_subscriber_class_pricing[product_index][index]).then(function() {
      alert("updated pricing");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateSubscriberClassDisplayPrice = function(product, subscriber_class, pricing_field_id) {
    Products.updateSubscriberClassDisplayPrice($routeParams.product_line_revision_id, product, subscriber_class, pricing_field_id).then(function() {
      alert("updated pricing field");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateSubscriberClassMarkupCalculator = function(product, subscriber_class, markup_calculator_id) {
    Products.updateSubscriberClassMarkupCalculator($routeParams.product_line_revision_id, product, subscriber_class, markup_calculator_id).then(function() {
      alert("updated markup calculator");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateProductLocationPrice = function(product, location, pricing_field, product_index, index) {
    Products.updateProductLocationPricing($routeParams.product_line_revision_id, product, location, pricing_field, $scope.product_location_pricing[product_index][index]).then(function() {
      alert("updated pricing");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateLocationDisplayPrice = function(product, location, pricing_field_id) {
    Products.updateLocationDisplayPrice($routeParams.product_line_revision_id, product, location, pricing_field_id).then(function() {
      alert("updated pricing field");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateLocationMarkupCalculator = function(product, location, markup_calculator_id) {
    Products.updateLocationMarkupCalculator($routeParams.product_line_revision_id, product, location, markup_calculator_id).then(function() {
      alert("updated markup calculator");
    }, function(response) {
      alert(response);
    });
  };

  $scope.upload = function (file, is_primary) {
    Upload.upload({
        url: "/api/v1/product_line_revisions/" + $routeParams.product_line_revision_id + "/products/" + $scope.product._id + "/media/upload",
        data: { file: file,  'is_primary': is_primary }
    }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };
  init();
});
