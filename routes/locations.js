var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account  = require('../models/account');
var Location = require('../models/location');
var MarkupCalculator = require('../models/markup_calculator');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting locations for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_locations')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._locations);
    });
  })
  .post(function(req, res) {
    console.log("creating location for subdomain " + req.subdomain);

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
        var location = new Location();

        location.name = req.body.name;
        location.about_location = req.body.about_location;
        location.hours = req.body.hours;
        location.address.address_line_1 = req.body.address.address_line_1;
        location.address.address_line_2 = req.body.address.address_line_2;
        location.address.city = req.body.address.city;
        location.address.state = req.body.address.state;
        location.address.zip_code = req.body.address.zip_code;
        location.address.manager = req.body.address.manager;
        location.contact.phone_number = req.body.contact.phone_number;
        location.contact.fax_number = req.body.contact.fax_number;
        location.contact.email_address = req.body.contact.email_address;
        location.contact.website_url = req.body.contact.website_url;
        location.contact.twitter_handle = req.body.contact.twitter_handle;
        if(markup_calculator) {
          location._default_calculator = markup_calculator;
        }

        location.save(function(err) {
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
            account._locations.push(location);

            account.save(function(err) {
              account._product_lines.forEach(function(product_line) {
                var current_revision = product_line._current_revision;

                current_revision.locations.push(location);
                current_revision.save(function(err) {
                  //FixMe: Handle this better
                  console.log(err);
                });

              });
            });

            res.json(location);
          }
        });
      });
    });
  });
router.route('/:location_id')
  .get(function(req, res) {
    console.log("getting location " + req.params.location_id + " for subdomain " + req.subdomain);

    Location.findById(req.params.location_id, function(err, location) {
      if(err) {
        return res.send(err);
      }

      if(!location) {
        return res.status(404).send("Location not found.");
      }

      res.json(location);
    });
  });

module.exports = router;
