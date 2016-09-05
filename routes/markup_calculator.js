var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account  = require('../models/account');
var MarkupCalculator = require('../models/markup_calculator');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting markup calculators for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_markup_calculators')
    .exec(function(err, account) {
      if(err){
        return res.status(400).send(err);
      }

      res.json(account._markup_calculators);
    });
  })
  .post(function(req, res) {
    console.log("creating markup calculator for subdomain " + req.subdomain);

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

      var markup_calculator = new MarkupCalculator();
      markup_calculator.name = req.body.name;
      markup_calculator.rules = [];

      var rules = req.body.rules;
      rules.forEach(function(r) {
        var rule = {
          destination_pricing_field: r.destination_pricing_field,
          is_manual: r.is_manual,
          pricing_rules: []
        };
        if(!rule.is_manual) {
          rule.source_pricing_field = r.source_pricing_field;
          rule.rounding_calculator = r.rounding_calculator;

          var pricing_rules = r.pricing_rules;
          pricing_rules.forEach(function(pricing_rule) {
            rule.pricing_rules.push({
              operation: pricing_rule.operation,
              amount: pricing_rule. amount,
              order: pricing_rule.order
            });
          });
        }
        markup_calculator.rules.push(rule);
      });

      markup_calculator.save(function(err) {
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
          account._markup_calculators.push(markup_calculator);

          account.save(function(err) {
            account._product_lines.forEach(function(product_line) {
              var current_revision = product_line._current_revision;

              if(current_revision) {
                current_revision.markup_calculators.push(markup_calculator);
                current_revision.save(function(err) {
                  //FixMe: Handle this better
                  if(err) {
                    return res.status(400).send(err);
                  }
                });
              }
            });
          });

          res.json(markup_calculator);
        }
      });
    });
  });
router.route('/:markup_calculator_id')
  .get(function(req, res) {
    console.log("getting markup calculator " + req.params.markup_calculator_id + " for subdomain " + req.subdomain);

    MarkupCalculator.findById(req.params.markup_calculator_id, function(err, markup_calculator) {
      if(err) {
        return res.status(400).send(err);
      }

      if(!markup_calculator) {
        return res.status(404).send("Markup Calculator not found.");
      }

      res.json(markup_calculator);
    });
  });

module.exports = router;
