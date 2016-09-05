// app/models/account.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Api = require("../models/api");
var Billing = require("../models/billing");
var CustomAttribute = require("../models/custom_attribute");
var List = require("../models/list");
var Location     = require('../models/location');
var MarkupCalculator = require('../models/markup_calculator');
var PricingField = require('../models/pricing_field');
var ProductLine  = require('../models/product_line');
var PullRequest = require('../models/pull_request');
var RoundingCalculator = require('../models/rounding_calculator');
var SubscriberClass    = require('../models/subscriber_class');
var Subscription = require('../models/subscription');
var User = require('../models/user');
var Widget = require('../models/widget');

var AccountSchema   = new Schema({
  name: {
    type: String,
    required: true
  },
  subdomain: {
    type: String,
    required: true
  },
  company: {
    corporate_name: {
      type: String,
      required: true
    },
    trading_name: {
      type: String,
      required: true
    },
    website_url: String,
    phone_number: String,
    fax_number: String
  },
  main_office_location: {
    address_line_1: String,
    address_line_2: String,
    city: String,
    state: String,
    zip_code: String
  },
  primary_contact: {
    first_name: String,
    last_name: String
  },
  branding: {
    color_1: {
      type: String,
      required: true,
      default: "#ffffff"
    },
    color_2: {
      type: String,
      required: true,
      default: "#000000"
    },
    color_3: {
      type: String,
      required: true,
      default: "#333333"
    },
    color_4: {
      type: String,
      required: true,
      default: "#999999"
    }
  },
  social_media: {
    facebook_url: String,
    twitter_name: String,
    linkedin_username: String,
    pintrest_url: String,
    google_plus_name: String,
    youtube_url: String,
    instagram_account: String,
    vine_account: String
  },
  terms: {
    sale: {
      type: String,
      required: true,
      default: "Sale"
    },
    list: {
      type: String,
      required: true,
      default: "List"
    },
    location: {
      type: String,
      required: true,
      default: "Location"
    },
    downstream_subscription: {
      type: String,
      required: true,
      default: "Downstream Subscription"
    },
    upstream_subscription: {
      type: String,
      required: true,
      default: "Upstream Subscription"
    },
    subscriber_class: {
      type: String,
      required: true,
      default: "Subscriber Class"
    }
  },
  defaults: {
    photos: {
      type: String,
      required: true,
      default: "Display"
    },
    likes: {
      type: String,
      required: true,
      default: "All"
    },
    shares: {
      type: String,
      required: true,
      default: "Selected"
    }
  },
  _product_lines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductLine'
  }],
  _apis: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Api'
  }],
  _widgets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Widget'
  }],
  _lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }],
  _locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }],
  _subscriber_classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriberClass'
  }],
  _pricing_fields: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingField'
  }],
  custom_statuses: [String],
  _custom_attributes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomAttribute'
  }],
  _users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  _upstream_subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  }],
  _downstream_subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  }],
  _pull_requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PullRequest'
  }],
  _billing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Billing'
  },
  _markup_calculators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarkupCalculator'
  }],
  _rounding_calculators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoundingCalculator'
  }]
},
{
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);
