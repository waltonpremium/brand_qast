var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var jwt        = require('jwt-simple');
var config = require('../config/database');
var Account = require('../models/account');
var Billing = require('../models/billing');
var PricingField = require('../models/pricing_field');
var User = require('../models/user');

router.use(function(req, res, next) {
  console.log("routing to register api");

  next();
});
// on routes that end in /linked_accounts
// ----------------------------------------------------
router.route('/')
  .post(function(req, res) {
    var account = new Account();

    account.company.corporate_name = req.body.name;
    account.company.trading_name = req.body.name;
    account.contact_first_name = req.body.contact_first_name;
    account.contact_last_name = req.body.contact_last_name;
    account.name = req.body.name;
    account.subdomain = req.body.subdomain;
    //account.website_url = req.body.website_url;
    account.phone_number = req.body.phone_number;
    //account.fax_number = req.body.fax_number;
    account.locations = [];
    account.subscriber_classes = [];
    account.product_lines = [];

    //default in pricing fields
    //Cost, MSRP, MAP, Regular Price, Discounted Price
    var cost_pricing_field = new PricingField();

    cost_pricing_field.field_name = "cost";
    cost_pricing_field.label = "Cost";
    cost_pricing_field.default_value = 0.00;
    cost_pricing_field.is_custom = false;

    cost_pricing_field.save(function(err) {
      if(err) {
        return res.status(400).send(err);
      }

      account._pricing_fields.push(cost_pricing_field);
    });

    var msrp_pricing_field = new PricingField();

    msrp_pricing_field.field_name = "msrp";
    msrp_pricing_field.label = "MSRP";
    msrp_pricing_field.default_value = 0.00;
    msrp_pricing_field.is_custom = false;

    msrp_pricing_field.save(function(err) {
      if(err) {
        return res.status(400).send(err);
      }

      account._pricing_fields.push(msrp_pricing_field);
    });

    var map_pricing_field = new PricingField();

    map_pricing_field.field_name = "map";
    map_pricing_field.label = "MAP";
    map_pricing_field.default_value = 0.00;
    map_pricing_field.is_custom = false;

    map_pricing_field.save(function(err) {
      if(err) {
        return res.status(400).send(err);
      }

      account._pricing_fields.push(map_pricing_field);
    });

    var regular_pricing_field = new PricingField();

    regular_pricing_field.field_name = "regular_price";
    regular_pricing_field.label = "Regular Price";
    regular_pricing_field.default_value = 0.00;
    regular_pricing_field.is_custom = false;

    regular_pricing_field.save(function(err) {
      if(err) {
        return res.status(400).send(err);
      }

      account._pricing_fields.push(regular_pricing_field);
    });

    var discounted_pricing_field = new PricingField();

    discounted_pricing_field.field_name = "discounted_price";
    discounted_pricing_field.label = "Discounted Price";
    discounted_pricing_field.default_value = 0.00;
    discounted_pricing_field.is_custom = false;

    discounted_pricing_field.save(function(err) {
      if(err) {
        return res.status(400).send(err);
      }

      account._pricing_fields.push(discounted_pricing_field);
    });

    var billing = new Billing();
    billing._account = account._id;
    //FixMe: this is not right
    billing.billing_type = "Beta";

    account.billing = billing._id;

    var user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.username = req.body.user.email_address;
    user.password = "password";
    user._account = account._id;

    user.save(function(err) {
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
        account._users.push(user._id);

        account.save(function(err) {
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
            var token = jwt.encode(user, config.secret);

            res.json({success: true, token: 'JWT ' + token, account: account, user: user});
          }
        });
      }
    });
  });

module.exports = router;
