var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var User = require('../models/user');

// on routes that end in /users
// ----------------------------------------------------
router.route('/')
  .post(function(req, res) {
    var user = new User();

    user.email_address = req.body.email_address;
    user.password = req.body.password;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;

    user.save(function(err) {
      if(err) {
        return res.send(err);
      }

      res.json({ message: 'User created' });
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) {
        return res.send(err);
      }

      res.json(users);
    });
  });
router.route('/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id)
    .populate('_account')
    .exec(function(err, user) {
      if(err){
        return res.send(err);
      }

      res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        return res.send(err);
      }

      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;

      user.save(function(err) {
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
          res.json(user);
        }
      });
    })
    .delete(function(req, res) {
      User.remove({
        _id: req.params.user_id
      }, function(err) {
        if(err) {
          return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
      });
    });
  });

module.exports = router;
