// app/models/account.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account = require("../models/account");
var BillingCard = require("../models/billing_card");

var BillingSchema   = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  billing_address: {
    address_line_1: String,
    address_line_2: String,
    city: String,
    state: String,
    zip_code: String
  },
  billing_type: String,
  billing_cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BillingCard'
  }],
  primary_card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BillingCard'
  },
  _billing_history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }]
});


module.exports = mongoose.model('Billing', BillingSchema);
