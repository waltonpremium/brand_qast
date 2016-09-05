// app/models/invoice.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account = require("../models/account");
var Billing = require("../models/billing");
var BillingCard = require("../models/billing_card");

var BillingSchema   = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  _billing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Billing'
  },
  _billing_card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BillingCard'
  },
  invoice_date: {
    type: Date,
    required: true
  },
  invoice_amount: {
    type: Number,
    required: true
  },
  paid_date: Date,
  paid_amount: Number,
  status: {
    type: String,
    required: true
  },
  payment_confirmation_number: String
});
