// app/models/api.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ProductLine  = require('../models/product_line');
var SubscriberClass     = require('../models/subscriber_class');

var ApiSchema   = new Schema({
  name: {
    type: String,
    required: true
  },
  purpose: String,
  _product_line: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductLine'
  },
  _subscriber_class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriberClass'
  },
},
{
    timestamps: true
});

module.exports = mongoose.model('Api', ApiSchema);
