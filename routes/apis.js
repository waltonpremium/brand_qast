var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Account = require('../models/account');
var Api = require('../models/api');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log("getting apis for subdomain " + req.subdomain);

    Account.findOne({subdomain: req.subdomain})
    .populate('_apis')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._apis);
    });
  });

module.exports = router;
