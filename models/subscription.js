// app/models/subscription.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account         = require('../models/account');
var SubscriberClass     = require('../models/subscriber_class');

var SubscriptionSchema   = new Schema({
  _downstream_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  _upstream_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  vendor_account_number: String,
  vendor_contact: {
    name: String,
    email_address: String,
    phone_number: String
  },
  subscription_request_notes: String,
  subscription_request_status: String,
  _subscriber_class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriberClass'
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
