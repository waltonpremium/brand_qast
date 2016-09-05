// app/models/location.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var MarkupCalculator = require('../models/markup_calculator');

var LocationSchema   = new Schema({
  name: {
    type: String,
    required: true
  },
  about: String,
  hours: String,
  address: {
    address_line_1: {
      type: String,
      required: true
    },
    address_line2: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip_code: {
      type: String,
      required: true
    },
    manager: String
  },
  contact: {
    phone_number: String,
    fax_number: String,
    email_address: String,
    website_url: String,
    twitter_handle: String
  },
  _default_calculator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarkupCalculator'
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);
