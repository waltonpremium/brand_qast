var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account = require('../models/account');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting custom statuses for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account.custom_statuses);
    });
  })
  .post(function(req, res) {
    console.log("creating custom statuses for subdomain " + req.subdomain);

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

      var custom_status = req.body.name;

      account.custom_statuses.push(custom_status);

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

            current_revision.custom_statuses.push(custom_status);
            current_revision.save(function(err) {
              //FixMe: Handle this case
              console.log(err);
            });
          });
        }
      });
      res.json(custom_status);
    });
  });
router.route('/:custom_status_id')
  .get(function(req, res) {
    console.log("getting custom status " + req.params.custom_status_id + " for subdomain " + req.subdomain);

    CustomStatus.findById(req.params.custom_status_id, function(err, custom_status) {
      if(err) {
        return res.send(err);
      }

      if(!custom_status) {
        return res.status(404).send("Custom Status not found.");
      }

      res.json(custom_status);
    });
  });
module.exports = router;
