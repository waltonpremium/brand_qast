var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account = require('../models/account');
var List = require('../models/list');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting lists for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_lists')
    .exec(function(err, account) {
      if(err) {
        return res.status(400).send(err);
      }

      res.json(account._lists);
    });
  })
  .post(function(req, res) {
    console.log("creating list for subdomain " + req.subdomain);

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

      var list = new List();

      list.name = req.body.name;

      list.save(function(err) {
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
          account._lists.push(list);

          account.save(function(err) {
            account._product_lines.forEach(function(product_line) {
              var current_revision = product_line._current_revision;

              current_revision.lists.push(list);
              current_revision.save(function(err) {
                //FixMe: Handle this better
                console.log(err);
              });
            });
          });
          res.json(list);
        }
      });
    });
  });
router.route('/:list_id')
  .get(function(req, res) {
    console.log("getting list " + req.params.list_id + " for subdomain " + req.subdomain);

    List.findById(req.params.list_id, function(err, list) {
      if(err) {
        return res.send(err);
      }

      if(!list) {
        return res.status(404).send("List not found.");
      }

      res.json(list);
    });
  });

module.exports = router;
