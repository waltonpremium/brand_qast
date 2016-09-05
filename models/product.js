// app/models/product.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var CustomAttribute = require('../models/custom_attribute');
var List         = require('../models/list');
var Location     = require('../models/location');
var MarkupCalculator = require('../models/markup_calculator');
var Media        = require('../models/media');
var ProductLineRevision = require('../models/product_line_revision');
var SubscriberClass     = require('../models/subscriber_class');

var ProductSchema   = new Schema({
  _product_line_revision: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductLineRevision',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand_name: String,
  description: String,
  sku: {
    type: String,
    required: true
  },
  manufacturer_number: {
    type: String,
    required: true
  },
  upc: String,
  link: String,
  notes: String,
  primary_media: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }],
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }],
  locations: [{
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    pricing: [{
      pricing_field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PricingField',
      },
      value: { type: Number, default: 0.00 }
    }],
    markup_calculator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MarkupCalculator'
    },
    display_price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PricingField'
    },
    effective_price: Number,
  }],
  subscriber_classes: [{
    subscriber_class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriberClass',
      required: true
    },
    markup_calculator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MarkupCalculator'
    },
    display_price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PricingField'
    },
    effective_price: Number,
    pricing: [{
      pricing_field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PricingField',
      },
      value: { type: Number, default: 0.00 }
    }]
  }],
  display_price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingField'
  },
  effective_price: Number,
  like_count: { type: Number, default: 0 },
  share_count: { type: Number, default: 0 },
  product_copy: {
    headline: String,
    subhead: String,
    intro_copy: String,
    body_copy: String,
    feature_list: String,
    specifications: String,
    shipping_info: String,
    website_url: String,
    video_url: String,
    related_products: String
  },
  product_status: {
    type: String,
    default: "Active"
  },
  custom_status: {
    type: String,
    required: true
  },
  pricing: [{
    pricing_field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PricingField',
    },
    value: { type: Number, default: 0.00 },
  }],
  custom_attributes: {
    custom_attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomAttribute'
    },
    value: String
  },
  markup_calculator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarkupCalculator'
  },
  pricing_locked: {
    type: Boolean,
    default: false
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
