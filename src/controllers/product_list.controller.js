//products_list.service.js
angular.module("brandqastApp")
.controller("ProductsListController", function(product_line, product_line_revision, products, inactive_products, custom_statuses, $scope, $route, $routeParams, $location, $localStorage, Products, ProductLines) {
  $scope.product_line = product_line.data;
  $scope.product_line_revision = product_line_revision.data;
  $scope.active_products = products.data.products;
  $scope.inactive_products = inactive_products.data;
  $scope.all_products = [];
  angular.extend($scope.all_products, $scope.products, $scope.inactive_products);
  $scope.custom_statuses = custom_statuses.data;
  window.scope = $scope;
  $scope.totalItems = products.data.totalNumberOfItems;
  $scope.currentPage = 1;

  $scope.products = $scope.active_products.slice(($scope.currentPage-1)*10, (($scope.currentPage)*10)-1);
  $scope.product_editing = [];
  $scope.product_pricing = [];
  $scope.current_edit = {
    row_index: -1,
    column_index: -1
  };
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.resetProductEditing = function(row_index, column_index) {
    for (var i=0; i<$scope.products.length; i++) {
      var editing = [];
      for (var j=0; j<$scope.product_line_revision.pricing_fields.length; j++) {
        $scope.product_editing[row_index][column_index] = false;
      }
    }
  };
  $scope.productDetail = function(product) {
    $location.path("/product_lines/" + $scope.product_line._id + "/product_line_revisions/" + $scope.product_line_revision._id + "/products/" + product._id);
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
    Products.getProducts($route.current.params.product_line_revision_id, $scope.currentPage).then(function(doc) {
      $scope.products = doc.data.products;
      $scope.totalItems = doc.data.totalNumberOfItems;
    }, function(response) {
      alert(response);
    });
  };

  $scope.commit = function() {
    ProductLines.commit($routeParams.product_line_id).then(function(doc) {
      alert("committed");
    }, function(response) {
      alert(response);
    });
  };
  $scope.syndicate = function() {
    ProductLines.syndicate($routeParams.product_line_id).then(function(doc) {
      alert("committed");
    }, function(response) {
      alert(response);
    });
  };
  $scope.isProductInList = function(product, list) {
    return product.lists.includes(list._id);
  };
  $scope.listChecked = function(product, list) {
    if(product.lists.includes(list._id)) {
      $scope.removeProductFromList(product, list._id);
    } else {
      $scope.addProductToList(product, list._id);
    }
  };
  $scope.addProductToList = function(product, list_id) {
    Products.addProductToList($routeParams.product_line_revision_id, product, list_id).then(function(doc) {
      product.lists.push(list_id);
    }, function(response) {
      alert(response);
    });
  };
  $scope.removeProductFromList = function(product, list_id) {
    Products.removeProductFromList($routeParams.product_line_revision_id, product, list_id).then(function(doc) {
      var index = product.lists.indexOf(list_id);
      if(index != -1) {
        product.lists.splice(index, 1);
      }
    }, function(response) {
      alert(response);
    });
  };
  $scope.allListChecked = function(product) {
    $scope.product_line_revision.lists.forEach(function(list) {
      if(!$scope.isProductInList(product, list)) {
        $scope.addProductToList(product, list._id);
      }
    });
  };
  $scope.priceCellClicked = function(row_index, column_index) {
    if($scope.current_edit.column_index > -1 && $scope.current_edit.row_index > -1) {
      $scope.product_editing[$scope.current_edit.row_index][$scope.current_edit.column_index] = false;
    }
    $scope.current_edit.row_index = row_index;
    $scope.current_edit.column_index = column_index;

    $scope.product_editing[row_index][column_index] = !$scope.product_editing[row_index][column_index];
  };
  $scope.updateProductPrice = function(product, pricing_field, product_index, index) {
    Products.updateProductPricing($routeParams.product_line_revision_id, product, pricing_field, $scope.product_pricing[product_index][index]).then(function() {
      alert("updated pricing");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateDisplayPrice = function(product, pricing_field_id) {
    Products.updateDisplayPrice($routeParams.product_line_revision_id, product, pricing_field_id).then(function() {
      alert("updated pricing field");
    }, function(response) {
      alert(response);
    });
  };
  $scope.updateMarkupCalculator = function(product, markup_calculator_id) {
    Products.updateMarkupCalculator($routeParams.product_line_revision_id, product, markup_calculator_id).then(function() {
      alert("updated markup calculator");
    }, function(response) {
      alert(response);
    });
  };
  $scope.getPrice = function(pricing, pricing_field) {
    for (var i=0; i<pricing.length; i++) {
      if(pricing[i].pricing_field == pricing_field._id) {
        return pricing[i].value;
      }
    }
    return 0.00;
  };
  $scope.isEditing = function(row_index, column_index) {
    return $scope.product_editing[row_index][column_index];
  };
  $scope.productStatusChanged = function(new_status, product) {
    if(new_status == "Inactive") {
      Products.deleteProduct($routeParams.product_line_revision_id, product).then(function(doc) {
        alert("Product inactived");
      }, function(response) {
        alert(response);
      });
    } else {

    }
  };
  $scope.customStatusChanged = function(new_status, product) {
    Products.setCustomStatus($routeParams.product_line_revision_id, product, { 'custom_status': new_status }).then(function(doc) {
      product.custom_status = new_status;
    }, function(response) {
      alert(response);
    });
  };

  for (var i=0; i<$scope.products.length; i++) {
    var editing = [];
    var pricing = [];
    for (var j=0; j<$scope.product_line_revision.pricing_fields.length; j++) {
      editing.push(false);
      var price = $scope.getPrice($scope.products[i].pricing, $scope.product_line_revision.pricing_fields[j]);
      console.log("price " + price);
      pricing.push(price);
    }
    $scope.product_editing.push(editing);
    $scope.product_pricing.push(pricing);
  }
});
