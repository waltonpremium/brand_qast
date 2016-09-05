// app/models/product_pricing.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var PricingField = require('../models/pricing_field');

var ProductPricingSchema   = new Schema({
  pricing_field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingField',
  },
  value: { type: Number, default: 0.00 }
},
{
    timestamps: true
});

module.exports = mongoose.model('ProductPricing', ProductPricingSchema);
