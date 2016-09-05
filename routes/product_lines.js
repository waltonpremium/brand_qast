var mongoose   = require('mongoose');
var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var ProductLine = require('../models/product_line');
var ProductLineRevision = require('../models/product_line_revision');
var Product = require('../models/product');
var PullRequest = require('../models/pull_request');
var Account = require('../models/account');

router.use(function(req, res, next) {
  console.log("routing to product lines api for subdomain " + req.subdomain);

  next();
});
// on routes that end in /product_lines
// ----------------------------------------------------
router.route('/')
  .get(function(req, res) {
    console.log('getting all product lines for subdomain ' + req.subdomain);
    Account.findOne({subdomain: req.subdomain})
    .populate('_product_lines')
    .exec(function(err, account) {
      if(err) {
        return res.send(err);
      }

      res.json(account._product_lines);
    });
  })
  .post(function(req, res) {
    console.log('creating a new product line for ' + req.subdomain);
    Account.findOne({subdomain: req.subdomain})
    .populate('_lists')
    .populate('_locations')
    .populate('_subscriber_classes')
    .populate('_pricing_fields')
    .populate('_custom_statuses')
    .exec(function(err, account) {
      if(err) {
        return res.status(404).send(err);
      }

      var productLine = new ProductLine();

      productLine.name = req.body.name;
      productLine.description = req.body.description;
      productLine._account = account;

      productLine.createProductLineRevision(function(product_line_revision) {
        product_line_revision.version = 1;

        productLine._revisions.push(product_line_revision._id);
        productLine._current_revision = product_line_revision._id;

        productLine.save(function(err) {
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
            account._product_lines.push(productLine._id);

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
                product_line_revision.save(function(err) {
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
                    res.send(productLine);
                  }
                });
              }
            });
          }
        });
      });
    });
  });
router.route('/:product_line_id')
  .get(function(req, res) {
    ProductLine.findById(req.params.product_line_id)
    .select('_id name createdAt updatedAt')
    .populate('_revisions')
    .exec(function(err, product_line) {
      if(err) {
        return res.send(err);
      }

      res.json(product_line);
    });
  })
  .put(function(req, res) {
    ProductLine.findById(req.params.product_line_id, function(err, product_line) {
      if(err) {
        return res.send(err);
      }

      product_line.name = req.body.name;
      product_line.description = req.body.description;

      product_line.save(function(err) {
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
          res.json(product_line);
        }
      });
    });
  })
  .delete(function(req, res) {
    ProductLine.remove({
      _id: req.params.product_line_id
    }, function(err) {
      if(err) {
        return res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });
router.route('/:product_line_id/product_line_revisions')
  .get(function(req, res) {
    ProductLine.findById(req.params.product_line_id)
    .populate('_revisions')
    .exec(function(err, product_line) {
      if(err) {
        return res.send(err);
      }

      res.json(product_line._revisions);
    });
  });
router.route('/:product_line_id/clone')
  .post(function(req, res) {
    ProductLine.findById(req.params.product_line_id)
    .populate({
      path: '_account',
      model: 'Account',
      populate: [{
        path: '_lists',
        model: 'List'
      }, {
        path: '_subscriber_classes',
        model: 'SubscriberClass'
      }, {
        path: '_locations',
        model: 'Location'
      }, {
        path: '_pricing_fields',
        model: 'PricingField'
      }]
    })
    .populate({
      path: '_current_revision',
      model: 'ProductLineRevision',
      populate: {
        path: 'products',
        model: 'Product'
      }
    })
    .exec(function(err, product_line) {
      var revision = product_line._current_revision;
      var products = [];

      product_line.createProductLineRevision(function(product_line_revision) {
        product_line_revision.version = revision.version + 1;
        product_line_revision.committed = false;

        revision.products.forEach(function(product) {
          var new_product = new Product(product);
          new_product._id = mongoose.Types.ObjectId();
          new_product.isNew = true;
          new_product._product_line_revision = product_line_revision._id;

          products.push(new_product);
        });

        Product.insertMany(products)
        .then(function(new_revision_products) {
          new_revision_products.forEach(function(new_revision_product) {
            product_line_revision.products.push(new_revision_product._id);
          });
          product_line_revision.save(function(err) {
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
              product_line._revisions.push(product_line_revision._id);
              product_line._current_revision = product_line_revision._id;

              product_line.save(function(err) {
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
                  revision.committed = true;

                  revision.save(function(err) {
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
                      res.json(revision);
                    }
                  });
                }
              });
            }
          });
        })
        .catch(function(err) {
            console.log(err);
        });
      });

      // Product.collection.insert(products,
      //   { ordered: false }
      // );
    });
  });
  router.route('/:product_line_id/syndicate')
    .post(function(req, res) {
      Account.findOne({subdomain: req.subdomain})
      .populate({
        path: '_downstream_subscriptions',
        model: 'Subscription',
        populate: {
          path: '_downstream_account',
          model: 'Account'
        }
      })
      .exec(function(err, account) {
        if(err) {
          return res.send(err);
        }

        ProductLine.findById(req.params.product_line_id)
        .populate('_current_revision')
        .exec(function(err, product_line) {
          var current_revision = product_line._current_revision;

          account._downstream_subscriptions.forEach(function(downstream_subscription) {
            var pull_request = new PullRequest();

            pull_request._downstream_account = downstream_subscription._downstream_account;
            pull_request._upstream_account = account;
            current_revision.products.forEach(function(product) {
              pull_request.products.push(product);
            });

            pull_request.save(function(err) {
              if(err)
                console.log(err);
            });
            downstream_subscription._downstream_account._pull_requests.push(pull_request);
            downstream_subscription._downstream_account.save(function(err) {
              if(err)
                console.log(err);
            });
          });
          res.sendStatus(200);
        });
      });
    });

module.exports = router;
