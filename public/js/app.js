//app.module.js
angular.module("brandqastApp", ['ngRoute', 'ngStorage', 'ui.bootstrap', 'ngFileUpload', 'ngSanitize']);

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

angular.module("brandqastApp")
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider
      .when("/", {
        templateUrl: "/product_lines.html",
        controller: "ProductLinesListController",
        resolve: {
          product_lines: function(ProductLines) {
              return ProductLines.getProductLines();
          }
        },
        activeTab: "product_lines"
      })
      .when("/settings/account/profile", {
        templateUrl: "/account_profile.html",
        controller: "AccountController",
        mode: 'account_profile',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          },
          billing: function($route, Billings) {
            return Billings.getBilling();
          }
        }
      })
      .when("/settings/account/primary_contact", {
        templateUrl: "/account_primary_contact.html",
        controller: "AccountController",
        mode: 'account_primary_contact',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          },
          billing: function($route, Billings) {
            return Billings.getBilling();
          }
        }
      })
      .when("/settings/account/billing_address", {
        templateUrl: "/billing_address.html",
        controller: "AccountController",
        mode: 'billing_address',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          },
          billing: function($route, Billings) {
            return Billings.getBilling();
          }
        }
      })
      .when("/settings/account/billing_credit_card", {
        templateUrl: "/billing_credit_card.html",
        controller: "AccountController",
        mode: 'billing_credit_card',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          },
          billing: function($route, Billings) {
            return Billings.getBilling();
          }
        }
      })
      .when("/settings/account/billing_history", {
        templateUrl: "/billing_history.html",
        controller: "AccountController",
        mode: 'billing_history',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          },
          billing: function($route, Billings) {
            return Billings.getBilling();
          }
        }
      })
      .when("/settings/account/users", {
        templateUrl: "/users.html",
        controller: "AccountController",
        mode: 'account_users',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          },
          billing: function($route, Billings) {
            return Billings.getBilling();
          }
        }
      })
      .when("/apis", {
        templateUrl: "/apis.html",
        controller: "ApisController",
        resolve: {
          apis: function($route, Apis) {
            return Apis.getApis();
          }
        },
        activeTab: "apis"
      })
      .when("/settings/company/profile", {
        templateUrl: "/company_profile.html",
        controller: "CompanyController",
        mode: 'company_profile',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          }
        }
      })
      .when("/settings/company/main_office_location", {
        templateUrl: "/company_main_office_location.html",
        controller: "CompanyController",
        mode: 'main_office_location',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          }
        }
      })
      .when("/settings/company/branding", {
        templateUrl: "/company_branding.html",
        controller: "CompanyController",
        mode: 'company_branding',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          }
        }
      })
      .when("/settings/company/social_media", {
        templateUrl: "/company_social_media.html",
        controller: "CompanyController",
        mode: 'company_social_media',
        resolve: {
          account: function($route, Accounts) {
            return Accounts.getAccount();
          }
        }
      })
      .when("/sign_up", {
        templateUrl: "/new_account.html",
        controller: "SignUpController"
      })
      .when("/sign_in", {
        templateUrl: "/sign_in.html",
        controller: "SignInController"
      })
      .when("/subscribe", {
        templateUrl: "/subscription_request.html",
        controller: "RequestSubscriptionController"
      })
      .when("/new_product_line", {
        templateUrl: "/product_line.html",
        controller: "NewProductLineController",
        mode: 'create'
      })
      .when("/settings/new_custom_attribute", {
        templateUrl: "/custom_attribute.html",
        controller: "NewCustomAttributeController",
        mode: 'create'
      })
      .when("/settings/new_custom_status", {
        templateUrl: "/custom_status.html",
        controller: "NewCustomStatusController",
        mode: 'create'
      })
      .when("/settings/new_list", {
        templateUrl: "/list.html",
        controller: "NewListController",
        mode: 'create'
      })
      .when("/settings/new_location", {
        templateUrl: "/location.html",
        controller: "NewLocationController",
        mode: 'create',
        resolve: {
          markup_calculators: function(MarkupCalculators) {
            return MarkupCalculators.getMarkupCalculators();
          }
        }
      })
      .when("/settings/new_pricing_field", {
        templateUrl: "/pricing_field.html",
        controller: "NewPricingFieldController",
        mode: 'create'
      })
      .when("/settings/new_subscriber_class", {
        templateUrl: "/subscriber_class.html",
        controller: "NewSubscriberClassController",
        mode: 'create',
        resolve: {
          markup_calculators: function(MarkupCalculators) {
            return MarkupCalculators.getMarkupCalculators();
          }
        }
      })
      .when("/settings/new_rounding_calculator", {
        templateUrl: "/rounding_calculator.html",
        controller: "NewRoundingCalculatorController",
        mode: 'create'
      })
      .when("/settings/new_markup_calculator", {
        templateUrl: "/markup_calculator.html",
        controller: "NewMarkupCalculatorController",
        mode: 'create',
        resolve: {
          pricing_fields: function(PricingFields) {
            return PricingFields.getPricingFields();
          },
          rounding_calculators: function(RoundingCalculators) {
            return RoundingCalculators.getRoundingCalculators();
          }
        }
      })
      .when("/settings/lists", {
        templateUrl: "/lists.html",
        controller: "ListsController",
        mode: 'lists',
        resolve: {
          lists: function(Lists) {
            return Lists.getLists();
          }
        }
      })
      .when("/settings/lists/:list_id", {
        templateUrl: "/list.html",
        controller: "ListController",
        mode: 'edit',
        resolve: {
          list: function($route, Lists) {
            return Lists.getList($route.current.params.list_id);
          }
        }
      })
      .when("/settings/locations", {
        templateUrl: "/locations.html",
        controller: "LocationsController",
        mode: 'locations',
        resolve: {
          locations: function(Locations) {
            return Locations.getLocations();
          }
        }
      })
      .when("/settings/locations/:location_id", {
        templateUrl: "/location.html",
        controller: "LocationController",
        mode: 'edit',
        resolve: {
          location: function($route, Locations) {
            return Locations.getLocation($route.current.params.location_id);
          },
          markup_calculators: function(MarkupCalculators) {
            return MarkupCalculators.getMarkupCalculators();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id", {
        templateUrl: "/products_list.html",
        controller: "ProductsListController",
        activeTab: 'products',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          },
          products: function($route, Products) {
            return Products.getProducts($route.current.params.product_line_revision_id, 1);
          },
          inactive_products: function($route, Products) {
            return Products.getInactiveProducts($route.current.params.product_line_revision_id, 1);
          },
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/import", {
        templateUrl: "/import.html",
        controller: "ImportController",
        activeTab: 'products',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/export", {
        templateUrl: "/export.html",
        controller: "ExportController",
        activeTab: 'products',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/pricing", {
        templateUrl: "/pricing.html",
        controller: "ProductsListController",
        activeTab: 'pricing',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          },
          products: function($route, Products) {
            return Products.getProducts($route.current.params.product_line_revision_id);
          },
          inactive_products: function($route, Products) {
            return Products.getInactiveProducts($route.current.params.product_line_revision_id);
          },
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/product_status", {
        templateUrl: "/product_status.html",
        controller: "ProductsListController",
        activeTab: 'product_status',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          },
          products: function($route, Products) {
            return Products.getProducts($route.current.params.product_line_revision_id);
          },
          inactive_products: function($route, Products) {
            return Products.getInactiveProducts($route.current.params.product_line_revision_id);
          },
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/inactive_products", {
        templateUrl: "/inactive_products.html",
        controller: "ProductsListController",
        activeTab: 'inactive_products',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          },
          products: function($route, Products) {
            return Products.getProducts($route.current.params.product_line_revision_id);
          },
          inactive_products: function($route, Products) {
            return Products.getInactiveProducts($route.current.params.product_line_revision_id);
          },
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/products/new", {
        templateUrl: "/product.html",
        controller: "NewProductController",
        mode: "create",
        activeTab: 'products',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          },
          custom_attributes: function(CustomAttributes) {
            return CustomAttributes.getCustomAttributes();
          },
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          },
          pricing_fields: function(PricingFields) {
            return PricingFields.getPricingFields();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revisions/:product_line_revision_id/products/:product_id", {
        templateUrl: "/product.html",
        controller: "ProductController",
        mode: "edit",
        activeTab: 'products',
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revision: function ($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevision($route.current.params.product_line_revision_id);
          },
          product: function($route, Products) {
            return Products.getProduct($route.current.params.product_line_revision_id, $route.current.params.product_id);
          },
          custom_attributes: function(CustomAttributes) {
            return CustomAttributes.getCustomAttributes();
          },
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          },
          pricing_fields: function(PricingFields) {
            return PricingFields.getPricingFields();
          }
        }
      })
      .when("/product_lines/:product_line_id/product_line_revision_history", {
        templateUrl: "/product_line_revision_history.html",
        controller: "ProductLineRevisionHistoryController",
        activeTab: "products",
        resolve: {
          product_line: function($route, ProductLines) {
            return ProductLines.getProductLine($route.current.params.product_line_id);
          },
          product_line_revisions: function($route, ProductLineRevisions) {
            return ProductLineRevisions.getProductLineRevisions($route.current.params.product_line_id);
          }
        }
      })
      .when("/settings/profile", {
        templateUrl: "/profile.html",
        controller: "ProfileController",
        mode: 'profile',
        resolve: {
          user: function(Accounts) {
            return Accounts.getAuthedUser();
          }
        }
      })
      .when("/settings/change_password", {
        templateUrl: "/change_password.html",
        controller: "ProfileController",
        mode: 'change_password',
      })
      .when("/pull_requests", {
        templateUrl: "/pull_requests.html",
        controller: "PullRequestsController",
        resolve: {
          pull_requests: function(PullRequests) {
            return PullRequests.getPullRequests();
          }
        },
        activeTab: "pull_requests"
      })
      .when("/settings/subscriber_classes", {
        templateUrl: "/subscriber_classes.html",
        controller: "SubscriberClassesController",
        mode: 'subscriber_classes',
        resolve: {
          subscriber_classes: function(SubscriberClasses) {
            return SubscriberClasses.getSubscriberClasses();
          }
        }
      })
      .when("/settings/subscriber_classes/:subscriber_class_id", {
        templateUrl: "/subscriber_class.html",
        controller: "SubscriberClassController",
        mode: 'edit',
        resolve: {
          subscriber_class: function($route, SubscriberClasses) {
            return SubscriberClasses.getSubscriberClass($route.current.params.subscriber_class_id);
          },
          markup_calculators: function(MarkupCalculators) {
            return MarkupCalculators.getMarkupCalculators();
          }
        }
      })
      .when("/settings/calculators", {
        templateUrl: "/calculators.html",
        controller: "CalculatorsController",
        mode: 'calculators',
        resolve: {
          markup_calculators: function(MarkupCalculators) {
            return MarkupCalculators.getMarkupCalculators();
          },
          rounding_calculators: function(RoundingCalculators) {
            return RoundingCalculators.getRoundingCalculators();
          }
        }
      })
      .when("/settings/rounding_calculators/:rounding_calculator_id", {
        templateUrl: "/rounding_calculator.html",
        controller: "RoundingCalculatorController",
        mode: 'edit',
        resolve: {
          rounding_calculator: function($route, RoundingCalculators) {
            return RoundingCalculators.getRoundingCalculator($route.current.params.rounding_calculator_id);
          }
        }
      })
      .when("/settings/markup_calculators/:markup_calculator_id", {
        templateUrl: "/markup_calculator.html",
        controller: "MarkupCalculatorController",
        mode: 'edit',
        resolve: {
          markup_calculator: function($route, MarkupCalculators) {
            return MarkupCalculators.getMarkupCalculator($route.current.params.markup_calculator_id);
          },
          pricing_fields: function(PricingFields) {
            return PricingFields.getPricingFields();
          }
        }
      })
      .when("/settings/custom_attributes", {
        templateUrl: "/custom_attributes.html",
        controller: "CustomAttributesController",
        mode: 'custom_attributes',
        resolve: {
          custom_attributes: function(CustomAttributes) {
            return CustomAttributes.getCustomAttributes();
          }
        }
      })
      .when("/settings/custom_attributes/:custom_attribute_id", {
        templateUrl: "/custom_attribute.html",
        controller: "CustomAttributeController",
        resolve: {
          custom_attribute: function($route, CustomAttributes) {
            return CustomAttributes.getCustomAttribute($route.current.params.custom_attribute_id);
          }
        }
      })
      .when("/settings/custom_statuses", {
        templateUrl: "/custom_statuses.html",
        controller: "CustomStatusesController",
        mode: 'custom_statuses',
        resolve: {
          custom_statuses: function(CustomStatuses) {
            return CustomStatuses.getCustomStatuses();
          }
        }
      })
      .when("/settings/custom_statuses/:custom_status_id", {
        templateUrl: "/custom_statuses.html",
        controller: "CustomStatusesController",
        resolve: {
          custom_statuses: function($route, CustomStatuses) {
            return CustomStatuses.getCustomStatuses($route.current.params.custom_status_id);
          }
        }
      })
      .when("/settings/option_classes", {
        templateUrl: "/option_classes.html",
        controller: "OptionClassesController",
        mode: 'option_classes'
      })
      .when("/settings/pricing_fields", {
        templateUrl: "/pricing_fields.html",
        controller: "PricingFieldsController",
        mode: 'pricing_fields',
        resolve: {
          pricing_fields: function(PricingFields) {
            return PricingFields.getPricingFields();
          }
        }
      })
      .when("/settings/pricing_fields/:pricing_field_id", {
        templateUrl: "/pricing_field.html",
        controller: "PricingFieldController",
        mode: "edit",
        resolve: {
          pricing_field: function($route, PricingFields) {
            return PricingFields.getPricingField($route.current.params.pricing_field_id);
          }
        }
      })
      .when("/settings/reconcilliation", {
        templateUrl: "/reconcilliation_settings.html",
        controller: "ReconcilliationSettingsController",
        mode: 'reconcilliation'
      })
      .when("/settings/syndication", {
        templateUrl: "/syndication_settings.html",
        controller: "SyndicationSettingsController",
        mode: 'syndication'
      })
      .when("/settings/terminology", {
        templateUrl: "/terminology.html",
        controller: "TerminologyController",
        mode: 'terminology'
      })
      .when("/settings/defaults", {
        templateUrl: "/defaults.html",
        controller: "DefaultsController",
        mode: 'defaults'
      })
      .when("/upstream_subscriptions", {
        templateUrl: "/upstream_subscriptions.html",
        controller: "UpstreamSubscriptionsController",
        resolve: {
          subscriptions: function($route, UpstreamSubscriptions) {
            return UpstreamSubscriptions.getSubscriptions();
          }
        },
        activeTab: "upstream"
      })
      .when("/downstream_subscriptions", {
        templateUrl: "/downstream_subscriptions.html",
        controller: "DownstreamSubscriptionsController",
        resolve: {
          subscriptions: function($route, Subscriptions) {
            return Subscriptions.getSubscriptions();
          }
        },
        activeTab: "downstream"
      })
      .when("/widgets", {
        templateUrl: "/widgets.html",
        controller: "WidgetsController",
        resolve: {
          widgets: function($route, Widgets) {
            return Widgets.getWidgets().data;
          }
        },
        activeTab: "widgets"
      })
      .when("/media", {
        templateUrl: "/media.html",
        controller: "MediaLibraryController"
      })
      .otherwise({
          redirectTo: "/"
      });
  });

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

//apis.controller.js
angular.module("brandqastApp")
.controller("ApisController", function(apis, $scope, $localStorage) {
  $scope.apis = [];

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//calculators.controller.js
angular.module("brandqastApp")
.controller("CalculatorsController", function($scope, markup_calculators, rounding_calculators, $location,$localStorage) {
  $scope.rounding_calculators = rounding_calculators.data;
  $scope.markup_calculators = markup_calculators.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.roundingCalculatorDetail = function(rounding_calculator) {
    $location.path("/settings/rounding_calculators/" + rounding_calculator._id);
  };
  $scope.markupCalculatorDetail = function(markup_calculator) {
    $location.path("/settings/markup_calculators/" + markup_calculator._id);
  };
});

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

//custom_attribute.controller.js
angular.module("brandqastApp")
.controller("CustomAttributeController", function(custom_attribute, $scope, $localStorage, $location) {
  $scope.custom_attribute = custom_attribute.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCustomAttribute = function(custom_attribute) {
    $localStorage.flash_message = "Custom Attribute (" + custom_attribute.group_name + ") successfully saved.";

    $location.path("/settings/custom_attributes");

    console.log("Save Custom Attribute");
  };
});

//custom_attributes.controller.js
angular.module("brandqastApp")
.controller("CustomAttributesController", function(custom_attributes, $scope, $location, $localStorage) {
  $scope.custom_attributes = custom_attributes.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.customAttributeDetail = function(custom_attribute) {
    $location.path("/settings/custom_attributes/" + custom_attribute._id);
  };
});

//custom_status.controller.js
angular.module("brandqastApp")
.controller("CustomStatusController", function(custom_status, $scope, $localStorage) {
  $scope.custom_status = custom_status.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCustomStatus = function(custom_status) {
    //FixMe: Implement saveCustomStatus
    console.log("save custom status not implemented");
  };
});

//custom_statuses.controller.js
angular.module("brandqastApp")
.controller("CustomStatusesController", function(custom_statuses, $scope, $location, $localStorage) {
  $scope.custom_statuses = custom_statuses.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.customStatusDetail = function(custom_status) {
    $location.path("/settings/custom_statuses/" + custom_status._id);
  };
});

//terminology.controller.js
angular.module("brandqastApp")
.controller("DefaultsController", function($scope, $localStorage, Accounts) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveDefaults = function(defaults) {
    Accounts.saveDefaults($scope.account, defaults).then(function(doc) {
      $scope.account.defaults = doc.data;

      $scope.flash_message = "Defaults saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your defaults. Please try again.";
      }

    });
  };
});

//downstream_subscriptions.controller.js
angular.module("brandqastApp")
.controller("DownstreamSubscriptionsController", function(subscriptions, $scope, $localStorage) {
  $scope.subscriptions = subscriptions.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//edit_product_line.controller.js
angular.module("brandqastApp")
.controller("EditProductLineController", function($scope, $routeParams, $localStorage, Contacts) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  ProductLine.getProductLine($routeParams.productLineId).then(function(doc) {
      $scope.productLine = doc.data;
  }, function(response) {
      alert(response);
  });

  $scope.toggleEdit = function() {
      $scope.editMode = true;
      $scope.productLineFormUrl = "product-line-form.html";
  };

  $scope.back = function() {
    $scope.editMode = false;
    $scope.productLineFormUrl = "";
  };

  $scope.saveProductLine = function(productLine) {
    ProductLines.editProductLine(productLine);
    $scope.editMode = false;
    $scope.contactFormUrl = "";
  };

  $scope.deleteProductLine = function(contactId) {
    ProductLines.deleteProductLine(contactId);
  };
});

//import.controller.js
angular.module("brandqastApp")
.controller("ExportController", function(product_line, product_line_revision, $scope, $localStorage, Upload) {
   $scope.product_line = product_line.data;
   $scope.product_line_revision = product_line_revision.data;

   if($localStorage.flash_message) {
     $scope.flash_message = $localStorage.flash_message;
     $localStorage.flash_message = undefined;
   }

   $scope.submit = function() {
     console.log("we are uploading a file!");
     if ($scope.file) {
       $scope.upload($scope.file);
     }
   };

   $scope.upload = function (file) {
       Upload.upload({
           url: '/api/v1/product_line_revisions/' + $scope.product_line_revision._id + '/products/import',
           data: {file: file }
       }).then(function (resp) {
           console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
       }, function (resp) {
           console.log('Error status: ' + resp.status);
       }, function (evt) {
           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
       });
   };
});

//import.controller.js
angular.module("brandqastApp")
.controller("ImportController", function(product_line, product_line_revision, $scope, $localStorage, Upload) {
   $scope.product_line = product_line.data;
   $scope.product_line_revision = product_line_revision.data;

   if($localStorage.flash_message) {
     $scope.flash_message = $localStorage.flash_message;
     $localStorage.flash_message = undefined;
   }

   $scope.submit = function() {
     console.log("we are uploading a file!");
     if ($scope.file) {
       $scope.upload($scope.file);
     }
   };

   $scope.upload = function (file) {
       Upload.upload({
           url: '/api/v1/product_line_revisions/' + $scope.product_line_revision._id + '/products/import',
           data: {file: file }
       }).then(function (resp) {
           console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
       }, function (resp) {
           console.log('Error status: ' + resp.status);
       }, function (evt) {
           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
       });
   };
});

//list.controller.js
angular.module("brandqastApp")
.controller("ListController", function(list, $scope, $location, $localStorage) {
  $scope.list = list.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveList = function(list) {
    //FixMe: Implement saveList
    $localStorage.flash_message = "List (" + list._id + ") successfully saved.";

    $location.path("/settings/lists");

    console.log("save list not implemented");
  };
  $scope.deleteList = function(list) {
    //FixMe: Implement deleteList
    $localStorage.flash_message = "List (" + list._id + ") successfully deleted.";

    $location.path("/settings/lists");

    console.log("delete list not implemented");
  };
});

//lists.controller.js
angular.module("brandqastApp")
.controller("ListsController", function(lists, $scope, $location, $localStorage) {
  $scope.lists = lists.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.listDetail = function(list) {
    $location.path("/settings/lists/" + list._id);
  };
});

//location.controller.js
angular.module("brandqastApp")
.controller("LocationController", function(location, markup_calculators, $scope, $location, $localStorage) {
  $scope.location = location.data;
  $scope.markup_calculators = markup_calculators.data;
  
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveLocation = function(location) {
    //FixMe: Implement saveLocation
    $localStorage.flash_message = "Location (" + location._id + ") successfully saved.";

    $location.path("/settings/locations");

    console.log("save location not implemented");
  };
  $scope.deleteLocation = function(location) {
    //FixMe: Implement deleteLocation
    $localStorage.flash_message = "Location (" + location._id + ") successfully deleted.";

    $location.path("/settings/locations");

    console.log("delete location not implemented");
  };
});

//locations.controller.js
angular.module("brandqastApp")
.controller("LocationsController", function(locations, $scope, $location, $localStorage) {
  $scope.locations = locations.data;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.locationDetail = function(location) {
    $location.path("/settings/locations/" + location._id);
  };
});

//main_nav.controller.js
angular.module("brandqastApp")
.controller("MainController", function($scope, $route, $location, $localStorage, Accounts, AuthenticationServiceChannel) {
  $scope.account = {};
  $scope.user = {};
  $scope.isAuthed = false;
  $scope.isLoggedIn = Accounts.isLoggedIn();
  $scope.$route = $route;
  $scope.flash_message = undefined;

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  window.scope = $scope;

  Accounts.getAccount().then(function(doc) {
    $scope.account = doc.data;

    $scope.isAuthed = Accounts.isAuthed($scope.account);
  });

  if($scope.isLoggedIn) {
    $scope.user = Accounts.getAuthedUser();
  }

  $scope.logout = function() {
    Accounts.logout();

    AuthenticationServiceChannel.accountLoggedOut();

    $location.path("/");
  };

  AuthenticationServiceChannel.onAccountSignedIn($scope, function() {
    $scope.isAuthed = true;
    $scope.isLoggedIn = true;
  });
  AuthenticationServiceChannel.onAccountLoggedOut($scope, function() {
    $scope.isAuthed = false;
    $scope.isLoggedIn = false;
  });

});

//markup_calculator.controller.js
angular.module("brandqastApp")
.controller("MarkupCalculatorController", function($scope, markup_calculator, pricing_fields, $location, $localStorage, MarkupCalculators) {
  $scope.operators = ['Add', 'Subtract', 'Multiply', 'Divide', 'Markup', 'Markdown'];
  $scope.markup_calculator = markup_calculator.data;
  $scope.pricing_fields = pricing_fields.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.addRoundingRule = function() {
    $scope.calculator.rules.push({
      min_price: "",
      max_price: "",
      rounding_option: "",
      rounding_amount: "",
      adjustment_amount: ""
    });
  };
  $scope.saveRoundingCalculator = function(calculator) {
    MarkupCalculatorControllers.saveMarkupCalculator(calculator).then(function(doc) {
      $localStorage.flash_message = "Calculator " + calculator.name + " was successfully saved.";

      $location.path("/settings/calculators");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your markup calculator. Please try again.";
      }
    });
  };
});

//media_library.controller.js
angular.module("brandqastApp")
.controller("MediaLibraryController", function($scope, $localStorage) {
  $scope.media = [];

  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//new_custom_attribute.controller.js
angular.module("brandqastApp")
.controller("NewCustomAttributeController", function($scope, $localStorage, CustomAttributes) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.custom_attribute = {
    group_name: "",
    attributes: [{
      name: "",
      default_value: "",
      sample_value: ""
    }]
  };
  $scope.addAttribute = function() {
    $scope.custom_attribute.attributes.push({
      name: "",
      default_value: "",
      sample_value: ""
    });
  };
  $scope.saveCustomAttribute = function(custom_attribute) {
    $scope.errors = [];
    
    CustomAttributes.createCustomAttribute(custom_attribute).then(function(doc) {
      $localStorage.flash_message = "Custom attribute " + custom_attribute.name + " was successfully created.";

      $location.path("/settings/custom_attributes");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your custom attribute. Please try again.";
      }
    });
  };
});

//new_custom_status.controller.js
angular.module("brandqastApp")
.controller("NewCustomStatusController", function($scope, $location, $localStorage, CustomStatuses) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.saveCustomStatus = function(custom_status) {
    CustomStatuses.createCustomStatus(custom_status).then(function(doc) {
      $localStorage.flash_message = "Custom status " + custom_status.name + " was successfully created.";

      $location.path("/settings/custom_statuses");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your custom status. Please try again.";
      }
    });
  };
});

//new_list.controller.js
angular.module("brandqastApp")
.controller("NewListController", function($scope, $location, $localStorage, Lists) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveList = function(list) {
    $scope.errors = [];

    Lists.createList(list).then(function(doc) {
      $localStorage.flash_message = "List " + list.name + " was successfully created.";

      $location.path("/settings/lists");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your list. Please try again.";
      }
    });
  };
});

//new_location.controller.js
angular.module("brandqastApp")
.controller("NewLocationController", function($scope, $location, markup_calculators, $localStorage, Locations) {
  $scope.location = {
    address: {},
    contact: {}
  };
  $scope.markup_calculators = markup_calculators.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveLocation = function(location) {
    $scope.errors = [];

    Locations.createLocation(location).then(function(doc) {
      $localStorage.flash_message = "Location " + location.name + " was successfully created.";

      $location.path("/settings/locations");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your location. Please try again.";
      }
    });
  };
});

//new_markup_calculator.controller.js
angular.module("brandqastApp")
.controller("NewMarkupCalculatorController", function($scope, $location, $localStorage, pricing_fields, rounding_calculators, MarkupCalculators) {
  $scope.pricing_fields = pricing_fields.data;
  $scope.rounding_calculators = rounding_calculators.data;

  $scope.markup_calculator = {
    name: "",
    rules: []
  };
  $scope.pricing_fields.forEach(function(pricing_field) {
    $scope.markup_calculator.rules.push({
      is_manual: true,
      destination_pricing_field: pricing_field,
      pricing_rules: [{
        operation: "",
        amount: "",
        order: 1
      }]
    });
  });

  $scope.operators = ['Add', 'Subtract', 'Multiply', 'Divide', 'Markup', 'Markdown'];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.addPricingRule = function(rule) {
    rule.pricing_rules.push({
      operation: "",
      amount: "",
      order: rule.pricing_rules.length + 1
    });
  };
  $scope.saveMarkupCalculator = function(markup_calculator) {
    MarkupCalculators.createMarkupCalculator(markup_calculator).then(function(doc) {
      $localStorage.flash_message = "Markup calculator " + markup_calculator.name + " was successfully created.";

      $location.path("/settings/calculators");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your markup calculator. Please try again.";
      }
    });
  };
});

//new_pricing_field.controller.js
angular.module("brandqastApp")
.controller("NewPricingFieldController", function($scope, $location, $localStorage, PricingFields) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.savePricingField = function(pricing_field) {
    PricingFields.createPricingField(pricing_field).then(function(doc) {
      $localStorage.flash_message = "Pricing field " + pricing_field.name + " was successfully created.";

      $location.path("/settings/pricing_fields");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your custom pricing field. Please try again.";
      }
    });
  };
});

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

//new_product_line.controller.js
angular.module("brandqastApp")
.controller("NewProductLineController", function($scope, $location, $localStorage, ProductLines) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.back = function() {
    $location.path("#/");
  };

  $scope.saveProductLine = function(productLine) {
    $scope.errors = [];
    
    ProductLines.createProductLine(productLine).then(function(doc) {
        var productLineUrl = "/product_lines/" + doc.data._id;

        $location.path(productLineUrl);
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your product line. Please try again.";
      }
    });
  };
});

//new_rounding_calculator.controller.js
angular.module("brandqastApp")
.controller("NewRoundingCalculatorController", function($scope, $location, $localStorage, RoundingCalculators) {
  $scope.rounding_options = ["Up", "Down"];
  $scope.rounding_amounts = ["0.10", "1.00", "10.00", "100.00", "1000.00", "10000.00"];
  $scope.calculator = {
    name: "",
    rules: [{
      min_price: "",
      max_price: "",
      rounding_option: "",
      rounding_amount: "",
      adjustment_amount: ""
    }]
  };
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.addRoundingRule = function() {
    $scope.calculator.rules.push({
      min_price: "",
      max_price: "",
      rounding_option: "",
      rounding_amount: "",
      adjustment_amount: ""
    });
  };
  $scope.saveRoundingCalculator = function(calculator) {
    $scope.errors = [];

    RoundingCalculators.createRoundingCalculator(calculator).then(function(doc) {
      $localStorage.flash_message = "Calculator " + calculator.name + " was successfully created.";

      $location.path("/settings/calculators");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your rounding calculator. Please try again.";
      }
    });
  };
});

//new_subscriber_class.controller.js
angular.module("brandqastApp")
.controller("NewSubscriberClassController", function($scope, markup_calculators, SubscriberClasses, $location, $localStorage) {
  $scope.markup_calculators = markup_calculators.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveSubscriberClass = function(subscriber_class) {
    SubscriberClasses.createSubscriberClass(subscriber_class).then(function(doc) {
      $localStorage.flash_message = "Subscriber class " + subscriber_class.name + " was successfully created.";

      $location.path("/settings/subscriber_classes");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your subscriber class. Please try again.";
      }
    });
  };
});

//option_classes.controller.js
angular.module("brandqastApp")
.controller("OptionClassesController", function($scope, $localStorage) {
  $scope.option_classes = [];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//pricing_field.controller.js
angular.module("brandqastApp")
.controller("PricingFieldController", function(pricing_field, $scope, $localStorage) {
  $scope.pricing_field = pricing_field.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.savePricingField = function(list) {
    //FixMe: Implement savePricingField
    console.log("save pricing field not implemented");
  };
});

//pricing_fields.controller.js
angular.module("brandqastApp")
.controller("PricingFieldsController", function(pricing_fields, $scope, $location, $localStorage) {
  $scope.pricing_fields = pricing_fields.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.pricingFieldDetail = function(pricing_field) {
    $location.path("/settings/pricing_fields/" + pricing_field._id);
  };
});

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

//product_line_revision_history.controller.js
angular.module("brandqastApp")
.controller("ProductLineRevisionHistoryController", function($scope, product_line, product_line_revisions, ProductLineRevisions, $localStorage) {
  $scope.product_line = product_line.data;
  $scope.product_line_revisions = product_line_revisions.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.rollback = function(product_line_revision) {
    ProductLineRevisions.rollbackToProductLineRevision(product_line_revision._id).then(function(doc) {
      var productLineUrl = "/product_lines/" + doc.data._id;

      $location.path(productLineUrl);
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred rolling back your product line. Please try again.";
      }
    });
  };
});

//product_lines_list.service.js
angular.module("brandqastApp")
.controller("ProductLinesListController", function(product_lines, Accounts, $scope, $localStorage) {
  $scope.product_lines = product_lines.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

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

//profile.controller.js
angular.module("brandqastApp")
.controller("ProfileController", function($scope, user, $localStorage) {
  $scope.user = user;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveUser = function(user) {

  };
});

//lists.controller.js
angular.module("brandqastApp")
.controller("PullRequestsController", function(pull_requests, $scope, $localStorage) {
  $scope.pull_requests = pull_requests.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//reconcilliation_settings.controller.js
angular.module("brandqastApp")
.controller("ReconcilliationSettingsController", function($scope, $localStorage) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//request_subscription.controller.js
angular.module("brandqastApp")
.controller("RequestSubscriptionController", function(Accounts, Subscriptions, $scope, $routeParams, $localStorage) {
  $scope.subscribe = function(subscription_request) {
    if($localStorage.flash_message) {
      $scope.flash_message = $localStorage.flash_message;
      $localStorage.flash_message = undefined;
    }
    Subscriptions.createSubscriptionRequest($routeParams.account_id, subscription_request).then(function(doc) {
      alert("Subscription Request Created");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your subscription request. Please try again.";
      }
    });
  };
});

//rounding_calculator.controller.js
angular.module("brandqastApp")
.controller("RoundingCalculatorController", function($scope, rounding_calculator, $location, $localStorage, RoundingCalculators) {
  $scope.calculator = rounding_calculator.data;
  $scope.rounding_options = ["Up", "Down"];
  $scope.rounding_amounts = ["0.10", "1.00", "10.00", "100.00", "1000.00", "10000.00"];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.addRoundingRule = function() {
    $scope.calculator.rules.push({
      min_price: "",
      max_price: "",
      rounding_option: "",
      rounding_amount: "",
      adjustment_amount: ""
    });
  };
  $scope.saveRoundingCalculator = function(calculator) {
    $scope.errors = [];

    RoundingCalculators.saveRoundingCalculator(calculator).then(function(doc) {
      $localStorage.flash_message = "Calculator " + calculator.name + " was successfully saved.";

      $location.path("/settings/calculators");
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your rounding calculator. Please try again.";
      }
    });
  };
});

//sign_in.controller.js
angular.module("brandqastApp")
.controller("SignInController", function($scope, $location, $localStorage, Accounts, AuthenticationServiceChannel) {
  $scope.signIn = function(username, password) {
    if($localStorage.flash_message) {
      $scope.flash_message = $localStorage.flash_message;
      $localStorage.flash_message = undefined;
    }
    Accounts.authenticate(username, password).then(function(doc) {
      if(doc.data.success) {
        var token = doc.data.token;
        var userId = doc.data.user_id;

        Accounts.getUser(userId).then(function(doc) {
          var user = doc.data;
          Accounts.login(token, user);

          AuthenticationServiceChannel.accountSignedIn();

          var accountUrl = "/accounts/" + user._account._id;
          $location.path(accountUrl);
        });

      } else {
        alert("sign in failed");
      }
    }, function(response) {
        alert(response);
    });
  };
});

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

//subscriber_class.controller.js
angular.module("brandqastApp")
.controller("SubscriberClassController", function(subscriber_class, markup_calculators, $scope, $location, $localStorage) {
  $scope.subscriber_class = subscriber_class.data;
  $scope.markup_calculators = markup_calculators.data;
  
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveSubscriberClass = function(subscriber_class) {
    //FixMe: Implement saveSubscriberClass
    $localStorage.flash_message = "Subscriber Class (" + subscriber_class.name + ") successfully saved.";

    $location.path("/settings/subscriber_classes");

    console.log("save subscriber class not implemented");
  };
  $scope.deleteSubscriberClass = function(subscriber_class) {
    //FixMe: Implement deleteSubscriberClass
    $localStorage.flash_message = "Subscriber Class (" + subscriber_class.name + ") successfully deleted.";

    $location.path("/settings/subscriber_classes");

    console.log("delete subscriber class not implemented");
  };
});

//subscriber_classes.controller.js
angular.module("brandqastApp")
.controller("SubscriberClassesController", function(subscriber_classes, $scope, $location, $localStorage) {
  $scope.subscriber_classes = subscriber_classes.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }

  $scope.subscriberClassDetail = function(subscriber_class) {
    $location.path("/settings/subscriber_classes/" + subscriber_class._id);
  };
});

//syndication_settings.controller.js
angular.module("brandqastApp")
.controller("SyndicationSettingsController", function($scope, $localStorage) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//terminology.controller.js
angular.module("brandqastApp")
.controller("TerminologyController", function($scope, $localStorage, Accounts) {
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
  $scope.saveTerminology = function(terms) {
    Accounts.saveTerminology($scope.account, terms).then(function(doc) {
      $scope.account.terms = doc.data;

      $scope.flash_message = "Terminology saved.";
    }, function(response) {
      if(response.data.error) {
        $scope.errors = response.data.error.errors;
      } else {
        $scope.flash_message = "Sorry, an error occurred saving your terminology. Please try again.";
      }

    });
  };
});

//upstream_subscriptions.controller.js
angular.module("brandqastApp")
.controller("UpstreamSubscriptionsController", function(subscriptions, $scope, $localStorage) {
  $scope.subscriptions = subscriptions.data;
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

//widgets.controller.js
angular.module("brandqastApp")
.controller("WidgetsController", function(widgets, $scope, $localStorage) {
  $scope.widgets = [];
  if($localStorage.flash_message) {
    $scope.flash_message = $localStorage.flash_message;
    $localStorage.flash_message = undefined;
  }
});

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

//apis.service.js
angular.module("brandqastApp")
.service("Apis", function($http) {
  this.getApis = function() {
    return $http.get("/api/v1/apis").
      then(function(response) {
        return response;
      });
  };
});

//apis.service.js
angular.module("brandqastApp")
.service('AuthenticationServiceChannel', function ($rootScope) {
    var ACCOUNT_LOGGED_OUT_MESSAGE,
      accountLoggedOut,
      onAccountLoggedOut,
      ACCOUNT_SIGNED_IN_MESSAGE,
      accountSignedIn,
      onAccountSignedIn;

    ACCOUNT_LOGGED_OUT_MESSAGE = 'accountLoggedOutMessage';
    accountLoggedOut = function() {
      $rootScope.$broadcast(ACCOUNT_LOGGED_OUT_MESSAGE);
    };
    onAccountLoggedOut = function($scope, handler) {
      $scope.$on(ACCOUNT_LOGGED_OUT_MESSAGE, function(event, message) {
        handler();
      });
    };
    ACCOUNT_SIGNED_IN_MESSAGE = 'accountSignedInMessage';
    accountSignedIn = function() {
      $rootScope.$broadcast(ACCOUNT_SIGNED_IN_MESSAGE);
    };
    onAccountSignedIn = function($scope, handler) {
      $scope.$on(ACCOUNT_SIGNED_IN_MESSAGE, function(event, message) {
        handler();
      });
    };
    return {
      accountLoggedOut: accountLoggedOut,
      onAccountLoggedOut: onAccountLoggedOut,
      accountSignedIn: accountSignedIn,
      onAccountSignedIn: onAccountSignedIn
    };
  }
);

//billings.service.js
angular.module("brandqastApp")
.service("Billings", function($http) {
  this.getBilling = function() {
    return $http.get("/api/v1/billing").
      then(function(response) {
        return response;
      });
  };
  this.saveBillingAddress = function(billing, billing_address) {
    return $http.put("/api/v1/billing/" + billing._id + "/billing_address", billing_address).
      then(function(response) {
        return response;
      });
  };
});

//custom_attributes.service.js
angular.module("brandqastApp")
.service("CustomAttributes", function($http) {
  this.getCustomAttributes = function() {
    return $http.get("/api/v1/custom_attributes").
      then(function(response) {
        return response;
      });
  };
  this.getCustomAttribute = function(custom_attribute_id) {
    return $http.get("/api/v1/custom_attributes/" + custom_attribute_id).
      then(function(response) {
        return response;
      });
  };
  this.createCustomAttribute = function(custom_attribute) {
    return $http.post("/api/v1/custom_attributes", custom_attribute).
      then(function(response) {
        return response;
      });
  };
});

//pricing_fields.service.js
angular.module("brandqastApp")
.service("CustomStatuses", function($http) {
  this.getCustomStatuses = function() {
    return $http.get("/api/v1/custom_statuses").
      then(function(response) {
        return response;
      });
  };
  this.getCustomStatus = function(custom_status_id) {
    return $http.get("/api/v1/custom_statuses/" + custom_status_id).
      then(function(response) {
        return response;
      });
  };
  this.createCustomStatus = function(custom_status) {
    return $http.post("/api/v1/custom_statuses", custom_status).
      then(function(response) {
        return response;
      });
  };
});

//lists.service.js
angular.module("brandqastApp")
.service("Lists", function($http) {
  this.getLists = function() {
    return $http.get("/api/v1/lists").
      then(function(response) {
        return response;
      });
  };
  this.getList = function(list_id) {
    return $http.get("/api/v1/lists/" + list_id).
      then(function(response) {
        return response;
      });
  };
  this.createList = function(list) {
    return $http.post("/api/v1/lists", list).
      then(function(response) {
        return response;
      });
  };
});

//locations.service.js
angular.module("brandqastApp")
.service("Locations", function($http) {
  this.getLocations = function() {
    return $http.get("/api/v1/locations").
      then(function(response) {
        return response;
      });
  };
  this.getLocation = function(location_id) {
    return $http.get("/api/v1/locations/" + location_id).
      then(function(response) {
        return response;
      });
  };
  this.createLocation = function(location) {
    return $http.post("/api/v1/locations", location).
      then(function(response) {
        return response;
      });
  };
});

//markup_calculator.service.js
angular.module("brandqastApp")
.service("MarkupCalculators", function($http) {
  this.getMarkupCalculators = function() {
    return $http.get("/api/v1/markup_calculators").
      then(function(response) {
        return response;
      });
  };
  this.getMarkupCalculator = function(markup_calculator_id) {
    return $http.get("/api/v1/markup_calculators/" + markup_calculator_id).
      then(function(response) {
        return response;
      });
  };
  this.createMarkupCalculator = function(markup_calculator) {
    return $http.post("/api/v1/markup_calculators", markup_calculator).
      then(function(response) {
        return response;
      });
  };
  this.saveMarkupCalculator = function(markup_calculator) {
    return $http.put("/api/v1/markup_calculators", markup_calculator).
      then(function(response) {
        return response;
      });
  };
});

//pricing_fields.service.js
angular.module("brandqastApp")
.service("PricingFields", function($http) {
  this.getPricingFields = function() {
    return $http.get("/api/v1/pricing_fields").
      then(function(response) {
        return response;
      });
  };
  this.getPricingField = function(pricing_field_id) {
    return $http.get("/api/v1/pricing_fields/" + pricing_field_id).
      then(function(response) {
        return response;
      });
  };
  this.createPricingField = function(pricing_field) {
    return $http.post("/api/v1/pricing_fields", pricing_field).
      then(function(response) {
        return response;
      });
  };
});

//product_line_revisions.service.js
angular.module("brandqastApp")
.service("ProductLineRevisions", function($http) {
  this.getProductLineRevisions = function(product_line_id) {
    return $http.get("/api/v1/product_lines/" + product_line_id + "/product_line_revisions").
      then(function(response) {
        return response;
      });
  };
  this.getProductLineRevision = function(product_line_revision_id) {
    return $http.get("/api/v1/product_line_revisions/" + product_line_revision_id).
      then(function(response) {
        return response;
      });
  };
  this.rollbackToProductLineRevision = function(product_line_revision_id) {
    return $http.post("/api/v1/product_line_revisions/" + product_line_revision_id + "/rollback").
      then(function(response) {
        return response;
      });
    };
});

//product_lines.service.js
angular.module("brandqastApp")
.service("ProductLines", function($http) {
  this.getProductLine = function(product_line_id) {
    return $http.get("/api/v1/product_lines/" + product_line_id).
      then(function(response) {
        return response;
      });
  };
  this.getProductLines = function() {
    return $http.get("/api/v1/product_lines").
      then(function(response) {
        return response;
      });
  };
  this.createProductLine = function(productLine) {
    return $http.post("/api/v1/product_lines", productLine).
      then(function(response) {
        return response;
      });
  };
  this.commit = function(product_line_id) {
    return $http.post("/api/v1/product_lines/" + product_line_id + "/clone").
      then(function(response) {
        return response;
      });
  };
  this.syndicate = function(product_line_id) {
    return $http.post("/api/v1/product_lines/" + product_line_id + "/syndicate").
      then(function(response) {
        return response;
      });
  };
});

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

//pull_requests.service.js
angular.module("brandqastApp")
.service("PullRequests", function($http) {
  this.getPullRequests = function() {
    return $http.get("/api/v1/pull_requests").
      then(function(response) {
        return response;
      });
  };
});

//rounding_calculator.service.js
angular.module("brandqastApp")
.service("RoundingCalculators", function($http) {
  this.getRoundingCalculators = function() {
    return $http.get("/api/v1/rounding_calculators").
      then(function(response) {
        return response;
      });
  };
  this.getRoundingCalculator = function(rounding_calculator_id) {
    return $http.get("/api/v1/rounding_calculators/" + rounding_calculator_id).
      then(function(response) {
        return response;
      });
  };
  this.createRoundingCalculator = function(rounding_calculator) {
    return $http.post("/api/v1/rounding_calculators", rounding_calculator).
      then(function(response) {
        return response;
      });
  };
  this.saveRoundingCalculator = function(rounding_calculator) {
    return $http.put("/api/v1/rounding_calculators", rounding_calculator).
      then(function(response) {
        return response;
      });
  };
});

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

//subscriptions.service.js
angular.module("brandqastApp")
.service("Subscriptions", function($http) {
  this.createSubscriptionRequest = function(account_id, subscription_request) {
    return $http.post("/api/v1/subscriptions/" + account_id + "/request", subscription_request).
      then(function(response) {
        return response;
      });
  };
  this.getSubscriptions = function() {
    return $http.get("/api/v1/subscriptions").
      then(function(response) {
        return response;
      });
  };
});

//subscriptions.service.js
angular.module("brandqastApp")
.service("UpstreamSubscriptions", function($http) {
  this.getSubscriptions = function() {
    return $http.get("/api/v1/upstream_subscriptions").
      then(function(response) {
        return response;
      });
  };
});

//widgets.service.js
angular.module("brandqastApp")
.service("Widgets", function($http) {
  this.getWidgets = function() {
    return $http.get("/api/v1/widgets").
      then(function(response) {
        return response;
      });
  };
});
