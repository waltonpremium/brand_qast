var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account  = require('../models/account');
var MarkupCalculator = require('../models/markup_calculator');
var SubscriberClass = require('../models/subscriber_class');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting subscriber classes for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_subscriber_classes')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._subscriber_classes);
    });
  })
  .post(function(req, res) {
    console.log("creating subscriber class for subdomain " + req.subdomain);

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

      MarkupCalculator.findById(req.body._default_calculator, function(err, markup_calculator) {
        if(err) {
          return res.status(400).send(err);
        }

        var subscriberClass = new SubscriberClass();

        subscriberClass.name = req.body.name;
        subscriberClass.notes = req.body.notes;
        if(markup_calculator) {
          subscriberClass._default_calculator = markup_calculator;
        }

        subscriberClass.save(function(err) {
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
            account._subscriber_classes.push(subscriberClass);

            account.save(function(err) {
              account._product_lines.forEach(function(product_line) {
                var current_revision = product_line._current_revision;

                current_revision.subscriber_classes.push(subscriberClass);
                current_revision.save(function(err) {
                  //Fix Me: Handle this better
                  console.log(err);
                });
              });
            });

            res.json(subscriberClass);
          }
        });
      });
    });
  });
router.route('/:subscriber_class_id')
  .get(function(req, res) {
    console.log("getting subscriber class " + req.params.subscriber_class_id + " for subdomain " + req.subdomain);

    SubscriberClass.findById(req.params.subscriber_class_id, function(err, subscriber_class) {
      if(err) {
        return res.send(err);
      }

      if(!subscriber_class) {
        return res.status(404).send("Subscriber Class not found.");
      }

      res.json(subscriber_class);
    });
  });


module.exports = router;
