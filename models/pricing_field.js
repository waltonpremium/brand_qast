// app/models/subscriber_class.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PricingFieldSchema   = new Schema({
  field_name: {
    type:String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  default_value: {
    type: Number,
    default: 0.00
  },
  is_custom: {
    type: Boolean,
    default: false
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('PricingField', PricingFieldSchema);
