// app/models/markup_calculator.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account      = require('../models/account');
var PricingField = require('../models/pricing_field');
var RoundingCalculator = require('../models/rounding_calculator');

var MarkupCalculatorSchema   = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: {
    type: String,
    required: true
  },
  rules: [{
    is_manual: {
      type: Boolean,
      required: true,
      default: true
    },
    destination_pricing_field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PricingField',
      required: true
    },
    source_pricing_field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PricingField',
      required: true
    },
    pricing_rules: [{
      operation: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      order: {
        type: Number,
        required: true
      }
    }],
    rounding_calculator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoundingCalculator',
      required: true
    }
  }]
});

module.exports = mongoose.model('MarkupCalculator', MarkupCalculatorSchema);
