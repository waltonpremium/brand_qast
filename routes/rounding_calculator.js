var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account  = require('../models/account');
var RoundingCalculator = require('../models/rounding_calculator');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting rounding calculators for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_rounding_calculators')
    .exec(function(err, account) {
      if(err) {
        return res.status(400).send(err);
      }

      res.json(account._rounding_calculators);
    });
  })
  .post(function(req, res) {
    console.log("creating rounding calculator for subdomain " + req.subdomain);

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
        return res.status(400).send(err);
      }

      var rounding_calculator = new RoundingCalculator();

      rounding_calculator.name = req.body.name;
      rounding_calculator.rules = [];

      var rules = req.body.rules;
      var order = 1;
      rules.forEach(function(rule) {
        console.log(rule);
        rounding_calculator.rules.push({
          min_price: rule.min_price,
          max_price: rule.max_price,
          rounding_option: rule.rounding_option,
          rounding_amount: rule.rounding_amount,
          adjustment_amount: rule.adjustment_amount
        });
        order += 1;
      });

      rounding_calculator.save(function(err) {
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
          account._rounding_calculators.push(rounding_calculator);

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
              account._product_lines.forEach(function(product_line) {
                var current_revision = product_line._current_revision;

                current_revision.rounding_calculators.push(rounding_calculator);
                current_revision.save(function(err) {
                  if(err) {
                    return res.status(400).send(err);
                  }
                });
              });

              res.json(rounding_calculator);
            }
          });
        }
      });
    });
  });
router.route('/:rounding_calculator_id')
  .get(function(req, res) {
    console.log("getting rounding calculator " + req.params.rounding_calculator_id + " for subdomain " + req.subdomain);

    RoundingCalculator.findById(req.params.rounding_calculator_id, function(err, rounding_calculator) {
      if(err) {
        return res.status(400).send(err);
      }

      if(!rounding_calculator) {
        return res.status(404).send("Rounding Calculator not found.");
      }

      res.json(rounding_calculator);
    });
  });

module.exports = router;
