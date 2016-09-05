// app/models/billing_card.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account = require("../models/account");

var BillingCardSchema   = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  name_on_card: {
    type: String,
    required: true
  },
  card_number_last_four: {
    type: String,
    required: true
  },
  card_token: String,
  billing_address: {
    address_line_1: {
      type: String,
      required: true
    },
    address_line_2: String,
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
    }
  },
});
