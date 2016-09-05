var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account = require('../models/account');
var PricingField = require('../models/pricing_field');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting pricing field for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_pricing_fields')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._pricing_fields);
    });
  })
  .post(function(req, res) {
    console.log("creating pricing field for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_product_lines')
    .populate({
      path: '_product_lines',
      model: 'ProductLine',
      populate: {
        path: '_current_revision',
        model: 'ProductLineRevision'
      }
    })
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      var pricing_field = new PricingField();

      pricing_field.field_name = req.body.field_name;
      pricing_field.label = req.body.label;
      pricing_field.default_value = req.body.default_value;
      pricing_field.is_custom = true;

      pricing_field.save(function(err) {
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
          account._pricing_fields.push(pricing_field);

          account.save(function(err) {
            account._product_lines.forEach(function(product_line) {
              var current_revision = product_line._current_revision;

              current_revision.pricing_fields.push(pricing_field);
              current_revision.save(function(err) {
                console.log(err);
              });
            });
          });
          res.json(pricing_field);
        }
      });
    });
  });
router.route('/:pricing_field_id')
  .get(function(req, res) {
    console.log("getting pricing field " + req.params.pricing_field_id);

    PricingField.findById(req.params.pricing_field_id)
    .exec(function(err, pricing_field) {
      if(err) {
        return res.send(err);
      }

      if(!pricing_field) {
        return res.status(404).send("Pricing Field not found");
      }

      res.json(pricing_field);
    });
  });
  
module.exports = router;
