var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var SubscriptionRequest = require('../models/subscription');
var Account = require('../models/account');
var User = require('../models/user');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    Account.findOne({subdomain: req.subdomain})
    .populate({
      path: '_downstream_subscriptions',
      model: 'Subscription',
      populate: {
        path: '_downstream_account',
        model: 'Account'
      }
    })
    .exec(function(err, account) {
      if(err)
        return res.send(err);

      res.json(account._downstream_subscriptions);
    });
  });
router.route('/:account_id/request')
  .post(function(req, res) {
    Account.findOne({subdomain: req.subdomain}, function(err, account) {
      if(err)
        return res.send(err);

      console.log("User:" + req.user);
      var subscriptionRequest = new SubscriptionRequest();

      var current_account = req.user._account;
      subscriptionRequest._downstream_account = current_account._id;
      subscriptionRequest._upstream_account = account._id;
      subscriptionRequest.vendor_account_number = req.body.vendor_account_number;
      subscriptionRequest.vendor_contact.name = req.body.vendor_contact.name;
      subscriptionRequest.vendor_contact.email_address = req.body.vendor_contact.email_address;
      subscriptionRequest.vendor_contact.phone_number = req.body.vendor_contact.phone_number;
      subscriptionRequest.subscription_request_notes = req.body.subscription_request_notes;
      subscriptionRequest.subscription_request_status = "Pending";

      subscriptionRequest.save(function(err) {
        if(err) {
          if(err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: err, message: 'Validation error' });
          } else if (err.name == 'MongoError' && err.code == 11000) {
              res.statusCode = 400;
              res.send({ error: err, message: 'Duplicate validation error' });
          } else {
              res.statusCode = 500;
              res.send({ error: err, message: 'Server error' });
          }
        } else {
          account._downstream_subscriptions.push(subscriptionRequest);
          account.save(function(err) {
            if(err)
              res.send(err);

            current_account._upstream_subscriptions.push(subscriptionRequest);
            current_account.save(function(err) {
              if(err)
                res.send(err);

              res.json({ message: 'Subscription created' });
            });
          });
        }
      });
    });
  });

  module.exports = router;
