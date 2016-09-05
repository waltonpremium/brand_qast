var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account = require('../models/account');
var CustomAttribute = require('../models/custom_attribute');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting lists for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_custom_attributes')
    .exec(function(err, account) {
      if(err) {
        return res.status(400).send(err);
      }

      res.json(account._custom_attributes);
    });
  })
  .post(function(req, res) {
    console.log("creating custom attribute for subdomain " + req.subdomain);

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
        return res.status(404).send(err);
      }

      var custom_attribute = new CustomAttribute();

      custom_attribute.group_name = req.body.group_name;
      custom_attribute.attributes = [];

      var attributes = req.body.attributes;

      attributes.forEach(function(attribute) {
        custom_attribute.attributes.push({
          name: attribute.name,
          default_value: attribute.default_value,
          sample_value: attribute.sample_value
        });
      });
      custom_attribute.save(function(err) {
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
          account._custom_attributes.push(custom_attribute);

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

                current_revision.custom_attributes.push(custom_attribute);
                current_revision.save(function(err) {
                  if(err) {
                    return res.status(404).send(err);
                  }
                });
              });
              res.send(custom_attribute);
            }
          });
        }
      });
    });
  });
router.route('/:custom_attribute_id')
  .get(function(req, res) {
    console.log("getting custom attribute " + req.params.custom_attribute_id + " for subdomain " + req.subdomain);

    CustomAttribute.findById(req.params.custom_attribute_id, function(err, custom_attribute) {
      if(err) {
        return res.status(404).send(err);
      }

      if(!custom_attribute) {
        return res.status(404).send("Custom Attribute not found.");
      }

      res.json(custom_attribute);
    });
  });

module.exports = router;
