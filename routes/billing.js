var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account = require('../models/account');
var Billing = require('../models/billing');
var Api = require('../models/api');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting billing for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_billing')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._billing);
    });
  });
router.route('/:billing_id/billing_address')
  .put(function(req, res) {
    Billing.findById(req.params.billing_id, function(err, billing) {
      if(err) {
        return res.status(400).send(err);
      }

      if(!billing) {
        return res.status(404).send("Account billing not found.");
      }
      billing.billing_address.address_line_1 = req.body.address_line_1;
      billing.billing_address.address_line_2 = req.body.address_line_2;
      billing.billing_address.city = req.body.city;
      billing.billing_address.state = req.body.state;
      billing.billing_address.zip_code = req.body.zip_code;

      billing.save(function(err) {
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
          res.json(billing.billing_address);
        }
      });
    });
  });

module.exports = router;
