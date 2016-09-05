// app/models/rounding_calculator.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account      = require('../models/account');

var RoundingCalculatorSchema   = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: {
    type: String,
    required: true
  },
  rules: [{
    min_price: {
      type: Number,
      required: true
    },
    max_price: {
      type: Number,
      required: true
    },
    rounding_option: {
      type: String,
      required: true
    },
    rounding_amount: {
      type: Number,
      required: true,
      default: 0.00
    },
    adjustment_amount: {
      type: Number,
      required: true,
      default: 0.00
    }
  }]
});

module.exports = mongoose.model('RoundingCalculator', RoundingCalculatorSchema);
