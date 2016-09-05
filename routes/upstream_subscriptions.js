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
      path: '_upstream_subscriptions',
      model: 'Subscription',
      populate: {
        path: '_upstream_account',
        model: 'Account'
      }
    })
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._upstream_subscriptions);
    });
  });

  module.exports = router;
