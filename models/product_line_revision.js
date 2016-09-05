// app/models/product_line_revision.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var CustomAttribute = require('../models/custom_attribute');
var PricingField = require('../models/pricing_field');
var Product      = require('../models/product');
var ProductLine  = require('../models/product_line');
var List         = require('../models/list');
var Location     = require('../models/location');
var RoundingCalculator   = require('../models/rounding_calculator');
var MarkupCalculator   = require('../models/markup_calculator');
var SubscriberClass     = require('../models/subscriber_class');

var ProductLineRevisionSchema   = new Schema({
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    inactive_products: [Product.schema],
    version: Number,
    committed: {
      type: Boolean,
      default: false
    },
    _product_line: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductLine'
    },
    lists: [List.schema],
    locations: [Location.schema],
    subscriber_classes: [SubscriberClass.schema],
    pricing_fields: [PricingField.schema],
    custom_statuses: [String],
    custom_attributes: [CustomAttribute.schema],
    markup_calculators: [MarkupCalculator.schema],
    rounding_calculators: [RoundingCalculator.schema],
    import_template_headers: {
      type: [String],
      default: [
        "Product Name",
        "Brand Name",
        "Description",
        "SKU",
        "Manufacturer Number",
        "UPC",
        "Link",
        "Notes",
        "Effective Price",
        "Headline",
        "Subhead",
        "Intro Copy",
        "Body Copy",
        "Feature List",
        "Specifications",
        "Shipping Info",
        "Website Url",
        "Video Url",
        "Related Products",
        "Product Status"
      ]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('ProductLineRevision', ProductLineRevisionSchema);
