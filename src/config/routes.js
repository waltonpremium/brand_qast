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
