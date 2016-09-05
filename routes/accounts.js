var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var Account = require('../models/account');
var Billing = require('../models/billing');
var PricingField = require('../models/pricing_field');
var ProductLine = require('../models/product_line');
var ProductLineRevision = require('../models/product_line_revision');
var Product = require('../models/product');
var User = require('../models/user');

router.use(function(req, res, next) {
  console.log("routing to accounts api");

  next();
});
// on routes that end in /linked_accounts
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    Account.findOne({subdomain: req.subdomain}, function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account);
    });
  });
router.route('/:account_id')
  .get(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err)
        res.send(err);

      res.json(account);
    });
  })
  .put(function(req, res) {
    Account.findyById(req.params.account_id, function(err, account) {
      if(err) {
        return res.send(err);
      }

      account.corporate_name = req.body.corporate_name;
      account.trading_name = req.body.trading_name;
      account.contact_first_name = req.body.contact_first_name;
      account.contact_last_name = req.body.contact_last_name;
      account.name = req.body.name;
      account.subdomain = req.body.subdomain;
      account.website_url = req.body.website_url;
      account.phone_number = req.body.phone_number;
      account.fax_number = req.body.fax_number;

      account.save(function(err) {
        if(err) {
          console.log(err);
          if(err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: 'Validation error' });
          } else if (err.name == 'MongoError' && err.code == 11000) {
              res.statusCode = 400;
              res.send({ error: 'Duplicate validation error' });
          } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
          }
        } else {
          res.json(account);
        }
      });
    });
  })
  .delete(function(req, res) {
    Account.remove({
      _id: req.params.account_id
    }, function(err) {
      if(err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });
router.route('/:account_id/billing')
  .post(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err)
        res.send(err);

      var billing = new Billing();
      billing._account = account._id;
      //FixMe: this is not right
      billing.billing_type = "Beta";
      account._billing = billing._id;

      billing.save(function(err) {
        if(err) {
          return res.status(400).send(err);
        }
        account.save(function(err) {
          if(err) {
            return res.status(400).send(err);
          }

          res.json(billing);
        });
      });
    });
  });
router.route('/:account_id/profile')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err)
        res.send(err);

      account.name = req.body.name;
      account.subdomain = req.body.subdomain;
      //FixMe:
      //industry type

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
          res.json({ 'name': account.name, 'subdomain': account.subdomain });
        }
      });
    });
  });
router.route('/:account_id/company')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err)
        res.send(err);

      account.company.corporate_name = req.body.corporate_name;
      account.company.trading_name = req.body.trading_name;
      account.company.website_url = req.body.website_url;
      account.company.phone_number = req.body.phone_number;
      account.company.fax_number = req.body.fax_number;

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
          res.json(account.company);
        }
      });
    });
  });
router.route('/:account_id/main_office_location')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err) {
        return res.send(err);
      }

      account.main_office_location.address_line_1 = req.body.address_line_1;
      account.main_office_location.address_line_2 = req.body.address_line_2;
      account.main_office_location.city = req.body.city;
      account.main_office_location.state = req.body.state;
      account.main_office_location.zip_code = req.body.zip_code;

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
          res.json(account.main_office_location);
        }
      });
    });
  });
router.route('/:account_id/branding')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err) {
        return res.send(err);
      }

      account.branding.color_1 = req.body.color_1;
      account.branding.color_2 = req.body.color_2;
      account.branding.color_3 = req.body.color_3;
      account.branding.color_4 = req.body.color_4;

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
          res.json(account.branding);
        }
      });
    });
  });
router.route('/:account_id/social_media')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err) {
        res.send(err);
      }

      account.social_media.facebook_url = req.body.facebook_url;
      account.social_media.twitter_name = req.body.twitter_name;
      account.social_media.linkedin_username = req.body.linkedin_username;
      account.social_media.pintrest_url = req.body.pintrest_url;
      account.social_media.google_plus_name = req.body.google_plus_name;
      account.social_media.youtube_url = req.body.youtube_url;
      account.social_media.instagram_account = req.body.instagram_account;
      account.social_media.vine_account = req.body.vine_account;

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
          res.json(account.social_media);
        }
      });
    });
  });

router.route('/:account_id/terminology')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err) {
        return res.status(404).send(err);
      }
      if(!account) {
        return res.status(404).send("Account Not Found");
      }
      account.terms.sale = req.body.sale;
      account.terms.list = req.body.list;
      account.terms.location = req.body.location;
      account.terms.downstream_subscription = req.body.downstream_subscription;
      account.terms.upstream_subscription = req.body.upstream_subscription;
      account.terms.subscriber_class = req.body.subscriber_class;

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
          res.json(account.terms);
        }
      });
    });
  });

router.route('/:account_id/defaults')
  .put(function(req, res) {
    Account.findById(req.params.account_id, function(err, account) {
      if(err) {
        return res.status(404).send(err);
      }
      if(!account) {
        return res.status(404).send("Account Not Found");
      }
      account.defaults.photos = req.body.photos;
      account.defaults.likes = req.body.likes;
      account.defaults.shares = req.body.shares;

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
          res.json(account.defaults);
        }
      });
    });
  });

module.exports = router;
