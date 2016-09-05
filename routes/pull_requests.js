var mongoose   = require('mongoose');
var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var Account = require('../models/account');
var PullRequest = require('../models/pull_request');

router.use(function(req, res, next) {
  console.log("routing to pull requests api for subdomain " + req.subdomain);

  next();
});
// on routes that end in /product_lines
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log('getting all pull requests for subdomain ' + req.subdomain);
    Account.findOne({subdomain: req.subdomain})
    .populate('_pull_requests')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._pull_requests);
    });
  });

module.exports = router;
