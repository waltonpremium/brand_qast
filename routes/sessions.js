var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var jwt        = require('jwt-simple');
var config = require('../config/database');
var mongoose   = require('mongoose');
var User = require('../models/user');

// route to authenticate a user (POST http://localhost:8080/api/sessions)
router.route('/')
  .post(function(req, res) {
    User.findOne({ username: req.body.username })
    .populate('_account')
    .exec(function(err, user) {
      if (err)
        res.send(err);

      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token, user_id: user._id});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

module.exports = router;
