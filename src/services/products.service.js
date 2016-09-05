//products.service.js
angular.module("brandqastApp")
.service("Products", function($http) {
  this.getProduct = function(product_line_revision_id, product_id) {
    return $http.get("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product_id).
      then(function(response) {
        return response;
      });
  };
  this.getProducts = function(product_line_revision_id, page) {
    if(!page) {
      page = 1;
    }
    return $http.get("/api/v1/product_line_revisions/" + product_line_revision_id + "/products?page=" + page ).
      then(function(response) {
        return response;
      });
  };
  this.getInactiveProducts = function(product_line_revision_id) {
    return $http.get("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/inactive").
      then(function(response) {
        return response;
      });
  };
  this.createProduct = function(product_line_revision_id, product) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/products", product).
      then(function(response) {
        return response;
      });
  };
  this.updateProduct = function(product_line_revision_id, product) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id, product).
      then(function(response) {
        return response;
      });
  };
  this.updateProductPricing = function(product_line_revision_id, product, pricing_field, new_value) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/pricing/" + pricing_field._id, {'new_value': new_value}).
      then(function(response) {
        return response;
      });
  };
  this.updateDisplayPrice = function(product_line_revision_id, product, pricing_field_id) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/display_price/" + pricing_field_id).
      then(function(response) {
        return response;
      });
  };
  this.updateMarkupCalculator = function(product_line_revision_id, product, markup_calculator_id) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/markup_calculators/" + markup_calculator_id).
      then(function(response) {
        return response;
      });
  };
  this.deleteProduct = function(product_line_revision_id, product) {
    return $http.delete("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id, product).
      then(function(response) {
        return response;
      });
  };
  this.activateProduct = function(product_line_revision_id, product) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/activate", product).
      then(function(response) {
        return response;
      });
  };
  this.addProductToList  = function(product_line_revision_id, product, list_id) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/lists/" + list_id).
      then(function(response) {
        return response;
      });
  };
  this.removeProductFromList = function(product_line_revision_id, product, list_id) {
    return $http.delete("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/lists/" + list_id).
      then(function(response) {
        return response;
      });
  };
  this.addProductToLocation  = function(product_line_revision_id, product, location_id) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/locations/" + location_id).
      then(function(response) {
        return response;
      });
  };
  this.removeProductFromLocation = function(product_line_revision_id, product, location_id) {
    return $http.delete("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/locations/" + location_id).
      then(function(response) {
        return response;
      });
  };
  this.addProductToSubscriberClass  = function(product_line_revision_id, product, subscriber_class_id) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/subscriber_classes/" + subscriber_class_id).
      then(function(response) {
        return response;
      });
  };
  this.removeProductFromSubscriberClass = function(product_line_revision_id, product, subscriber_class_id) {
    return $http.delete("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/subscriber_classes/" + subscriber_class_id).
      then(function(response) {
        return response;
      });
  };
  this.setCustomStatus = function(product_line_revision_id, product, custom_status) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/set_custom_status", custom_status).
    then(function(response) {
      return response;
    });
  };
  this.updateProductSubscriberClassPricing = function(product_line_revision_id, product, product_subscriber_class, pricing_field, new_value) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/subscriber_classes/" + product_subscriber_class._id + "/pricing/" + pricing_field._id, {'new_value': new_value}).
      then(function(response) {
        return response;
      });
  };
  this.updateSubscriberClassDisplayPrice = function(product_line_revision_id, product, product_subscriber_class, pricing_field_id) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/subscriber_classes/" + product_subscriber_class._id +  "/display_price/" + pricing_field_id).
      then(function(response) {
        return response;
      });
  };
  this.updateSubscriberClassMarkupCalculator = function(product_line_revision_id, product, product_subscriber_class, markup_calculator_id) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/subscriber_classes/" + product_subscriber_class._id + "/markup_calculators/" + markup_calculator_id).
      then(function(response) {
        return response;
      });
  };
  this.updateProductLocationPricing = function(product_line_revision_id, product, product_location, pricing_field, new_value) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/locations/" + product_location._id + "/pricing/" + pricing_field._id, {'new_value': new_value}).
      then(function(response) {
        return response;
      });
  };
  this.updateLocationDisplayPrice = function(product_line_revision_id, product, product_location, pricing_field_id) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/locations/" + product_location._id +  "/display_price/" + pricing_field_id).
      then(function(response) {
        return response;
      });
  };
  this.updateLocationMarkupCalculator = function(product_line_revision_id, product, product_location, markup_calculator_id) {
    return $http.put("/api/v1/product_line_revisions/" + product_line_revision_id + "/products/" + product._id + "/locations/" + product_location._id + "/markup_calculators/" + markup_calculator_id).
      then(function(response) {
        return response;
      });
  };
});
