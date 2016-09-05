var mongoose   = require('mongoose');
var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/apple/media');
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname );
  }
});
var upload = multer({ storage: storage  });
var fs = require('fs');
var parse = require('csv-parse');
var ProductLine = require('../models/product_line');
var ProductLineRevision = require('../models/product_line_revision');
var Product = require('../models/product');
var Account = require('../models/account');
var List = require('../models/list');
var Location = require('../models/location');
var Media = require('../models/media');
var PricingField = require('../models/pricing_field');
var ProductPricing = require('../models/product_pricing');
var SubscriberClass = require('../models/subscriber_class');

router.use(function(req, res, next) {
  console.log("routing to product line revisions api");

  next();
});

router.route('/:product_line_revision_id')
  .get(function(req, res) {
    console.log("getting product line revision " + req.params.product_line_revision_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .select('_id version committed lists locations subscriber_classes pricing_fields custom_statuses custom_attributes markup_calculators import_template_headers')
    .exec(function(err, revision) {
      if(err) {
        return res.send(err);
      }

      res.json(revision);
    });
  });
router.route('/:product_line_revision_id/rollback')
  .post(function(req, res) {
    console.log("rollback to revision " + req.params.product_line_revision_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .populate('_product_line')
    .exec(function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

      if(!revision) {
        return res.status(400).send("Revision not found.");
      }

      var product_line = revision._product_line;
      var new_revision = new ProductLineRevision(revision);

      new_revision._id = mongoose.Types.ObjectId();
      new_revision.isNew = true;
      new_revision.version = revision.version + 1;
      new_revision.products = [];
      new_revision.lists = product_line._account._lists;
      new_revision.locations = product_line._account._locations;
      new_revision.subscriber_classes = product_line._account._subscriber_classes;
      new_revision.pricing_fields = product_line._account._pricing_fields;
      new_revision._product_line = product_line;
      new_revision.committed = false;
      new_revision.createdAt = undefined;
      new_revision.updatedAt = undefined;

      new_revision.save(function(err) {
        if(err) {
          return res.status(404).send(err);
        }

        product_line._revisions.push(new_revision._id);
        product_line._current_revision = new_revision._id;

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
      });
    });
  });
router.route('/:product_line_revision_id/products')
  .post(function(req, res) {
    console.log("adding a product to revision " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

      if(!revision) {
        return res.status(400).send("Revision not found.");
      }

      var product = new Product();

      product._product_line_revision = revision;
      product.name = req.body.name;
      product.brand_name = req.body.brand_name;
      product.description = req.body.description;
      product.sku = req.body.sku;
      product.manufacturer_number = req.body.manufacturer_number;
      product.upc = req.body.upc;
      product.link = req.body.link;
      product.notes = req.body.notes;
      product.custom_status = req.body.custom_status;
      product.display_price = req.body.display_price;

      product.lists = [];
      var lists = req.body.lists;
      lists.forEach(function(list) {
        product.lists.push(list);
      });
      product.locations = [];
      var locations = req.body.locations;
      locations.forEach(function(location) {
        var product_location = {};
        product_location.location = location;

        product.locations.push(product_location);
      });
      product.subscriber_clasess = [];
      var subscriber_classes = req.body.subscriber_classes;
      subscriber_classes.forEach(function(subscriber_class) {
        var product_subscriber_class = {};
        product_subscriber_class.subscriber_class = subscriber_class;

        product.subscriber_classes.push(product_subscriber_class);
      });
      product.pricing = [];
      product.calculators = [];
      if(req.body.product_copy) {
        product.product_copy.headline = req.body.product_copy.headline;
        product.product_copy.subhead = req.body.product_copy.subhead;
        product.product_copy.intro_copy = req.body.product_copy.intro_copy;
        product.product_copy.body_copy = req.body.product_copy.body_copy;
        product.product_copy.feature_list = req.body.product_copy.feature_list;
        product.product_copy.specifications = req.body.product_copy.specifications;
        product.product_copy.shipping_info = req.body.product_copy.shipping_info;
        product.product_copy.website_url = req.body.product_copy.website_url;
        product.product_copy.video_url = req.body.product_copy.video_url;
        product.product_copy.related_products = req.body.product_copy.related_products;
      }
      var product_pricings = req.body.pricing;
      product_pricings.forEach(function(product_pricing) {
        var found = false;
        product.pricing.forEach(function(pricing) {
          if(pricing._id == product_pricing._id) {
            pricing.value = product_pricing.value;

            found = true;
          }
        });
        if(!found) {
          var pricing = {};

          pricing.pricing_field = product_pricing.pricing_field;
          pricing.value = product_pricing.value;

          product.pricing.push(pricing);
        }
      });

      product.save(function(err) {
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
          //Fix Me: Do we even need to do this??
          revision.products.push(product);

          revision.save(function(err) {
            if(err) {
              return res.status(400).send(err);
            }

            res.json(product);
          });
        }
      });
    });
  })
  .get(function(req, res) {
    console.log("getting products for current page " + req.query.page);

    var pageSize = 10;
    var currentPage = req.query.page;

    Product.find({"_product_line_revision": req.params.product_line_revision_id})
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .sort({
        name: 'asc'
    })
    .exec(function(err, products) {
      if(err) {
        return res.send(err);
      }

      // revision.products.sort(function(a, b){
      //    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
      //    if (nameA < nameB) //sort string ascending
      //     return -1;
      //    if (nameA > nameB)
      //     return 1;
      //    return 0; //default return value (no sorting)
      //  });
      Product.count({"_product_line_revision": req.params.product_line_revision_id}, function(err, count) {
        res.json({'products': products, 'totalNumberOfItems': count});
      });
    });
  });
router.route('/:product_line_revision_id/products/inactive')
  .get(function(req, res) {
    ProductLineRevision.findById(req.params.product_line_revision_id)
    .populate('inactive_products.media')
    .populate('inactive_products.primary_media')
    .exec(function(err, revision) {
      if(err) {
        return res.send(err);
      }

      res.json(revision.inactive_products);
    });
  });
router.route('/:product_line_revision_id/products/import')
  .post(upload.single('file'), function(req, res, next) {
    console.log("uploading file for " + req.subdomain);
    ProductLineRevision.findById(req.params.product_line_revision_id)
    .populate({
      path: 'products',
      model: 'Product'
    })
    .exec(function(err, revision) {
      if(err) {
        return res.send(err);
      }

      var parser = parse({delimiter: ','}, function(err, records){

        var header = records[0];
        var index = 0;
        var total = records.length;
        var totalSaved = 0;

        records.forEach(function(row) {
          if(index > 0) {
            var product = new Product();

            product._product_line_revision = revision;
            product.set(header[0], row[0]);
            product.set(header[1], row[1]);
            product.set(header[2], row[2]);
            product.set(header[3], row[3]);
            product.set(header[4], row[4]);
            product.set(header[5], row[5]);

            product.save(function(err) {
              totalSaved += 1;
              //FixMe: Handle this better
              if(err) {
                console.log(err);
              }
              revision.products.push(product);
              if(totalSaved >= (total-1)) {
                console.log("saved revision doc ");
                //Fix Me Do we even need to do this?
                revision.save(function(err) {
                  if(err)
                    console.log(err);

                  //res.json(revision.products);
                });
              }
            });
          }
          index += 1;
        });
      });
      fs.createReadStream(req.file.path).pipe(parser);
    });
  });

router.route('/:product_line_revision_id/products/:product_id/media/upload')
  .post(upload.single('file'), function(req, res, next) {
    console.log("uploading file for " + req.subdomain);

    Account.findOne({subdomain: req.subdomain}, function(err, account) {
      if(err) {
        return res.send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
        if(err) {
          return res.send(err);
        }
        if(!product) {
          return res.status(404).send("Product not found.");
        }

        var media = new Media();

        media.filename = req.file.path;
        media._account = account._id;

        var is_primary = req.body.is_primary || false;

        if(is_primary) {
          product.primary_media = media;
        }

        product.media.push(media);

        media.save(function(err) {
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
            //FixMe: Do we need to do this?
            product.save(function(err) {
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
                res.json(media);
              }
            });
          }
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id')
  .get(function(req, res) {
    Product.findById(req.params.product_id)
    .populate('subscriber_classes.subscriber_class')
    .populate('locations.location')
    .exec(function(err, product) {
      if(err) {
        return res.status(400).send(err);
      }
      if(!product) {
        return res.status(404).send("Product not found.");
      }

      res.json(product);
    });
  })
  .put(function(req, res) {
    console.log("updating product " + req.params.product_id);
    Product.findById(req.params.product_id, function(err, product) {
      if(err) {
        return res.status(400).send(err);
      }

      if(!product) {
        return res.status(404).send("Product not found.");
      }

      product.name = req.body.name;
      product.brand_name = req.body.brand_name;
      product.description = req.body.description;
      product.sku = req.body.sku;
      product.manufacturer_number = req.body.manufacturer_number;
      product.upc = req.body.upc;
      product.link = req.body.link;
      product.notes = req.body.notes;
      product.custom_status = req.body.custom_status;
      product.display_price = req.body.display_price;

      if(req.body.product_copy) {
        product.product_copy.headline = req.body.product_copy.headline;
        product.product_copy.subhead = req.body.product_copy.subhead;
        product.product_copy.intro_copy = req.body.product_copy.intro_copy;
        product.product_copy.body_copy = req.body.product_copy.body_copy;
        product.product_copy.feature_list = req.body.product_copy.feature_list;
        product.product_copy.specifications = req.body.product_copy.specifications;
        product.product_copy.shipping_info = req.body.product_copy.shipping_info;
        product.product_copy.website_url = req.body.product_copy.website_url;
        product.product_copy.video_url = req.body.product_copy.video_url;
        product.product_copy.related_products = req.body.product_copy.related_products;
      }

      var product_pricings = req.body.pricing;
      product_pricings.forEach(function(product_pricing) {
        var found = false;
        product.pricing.forEach(function(pricing) {
          if(pricing._id == product_pricing._id) {
            pricing.value = product_pricing.value;

            found = true;
          }
        });
        if(!found) {
          var pricing = {};

          pricing.pricing_field = product_pricing.pricing_field;
          pricing.value = product_pricing.value;

          product.pricing.push(pricing);
        }
      });

      product.save(function(err) {
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
          res.json(product);
        }
      });
    });
  })
  .delete(function(req, res) {
    console.log("make product " + req.params.product_id + " inactive");
    Product.findById(req.params.product_id, function(err, product) {
      if(err) {
        return res.status(400).send(err);
      }
      if(!product) {
        return res.status(404).send("Product not found.");
      }

      product.product_status = "Inactive";

      product.save(function(err) {
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
          res.json(product);
        }
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/pricing/:pricing_field_id')
  .put(function(req, res) {
    console.log("update pricing for product " + req.params.product_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .populate({
      path: 'pricing.pricing_field',
      model: 'PricingField'
    })
    .exec(function(err, revision) {
      if(err) {
        res.status(404).send(err);
      }

       Product.findById(req.params.product_id, function(err, product) {
         if(err) {
           res.status(404).send(err);
         }
         PricingField.findById(req.params.pricing_field_id, function(err, pricing_field) {
           if(err) {
             return res.status(400).send(err);
           }
           if(!pricing_field) {
             return res.status(404).send("Pricing field not found.");
           }

          var found = false;
          product.pricing.forEach(function(price) {
            console.log(price.pricing_field);
            console.log(pricing_field);
            if(String(price.pricing_field)== String(pricing_field._id)) {
              price.value = req.body.new_value;

              found = true;
            }
          });
          if(!found) {
            var pricing = {};

            pricing.pricing_field = pricing_field._id;
            pricing.value = req.body.new_value;

            product.pricing.push(pricing);
          }

          product.save(function(err) {
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
              res.json(product);
            }
          });
       });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/markup_calculators/:markup_calculator_id')
  .put(function(req, res) {
    console.log("update markup calculator for product " + req.params.product_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .exec(function(err, revision) {
      console.log("Revision: " + revision);
      if(err) {
        return res.status(404).send(err);
      }
      Product.findById(req.params.product_id, function(err, prodouct) {
        var markup_calculator = revision.markup_calculators.id(req.params.markup_calculator_id);
        if(!product) {
          return res.status(404).send("Product not found.");
        }
        if(!markup_calculator) {
          return res.status(404).send("Markup calculator not found.");
        }
        product.markup_calculator = markup_calculator;

        product.save(function(err) {
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
            res.json(product);
          }
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/display_price/:pricing_field_id')
  .put(function(req, res) {
    console.log("update display price for product " + req.params.product_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .exec(function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

       Product.findById(req.params.product_id, function(err, product) {
         var pricing_field = revision.pricing_fields.id(req.params.pricing_field_id);
         if(!product) {
           return res.status(404).send("Product not found.");
         }
         if(!pricing_field) {
           return res.status(404).send("Pricing field not found.");
         }
         product.display_price = pricing_field;

         product.save(function(err) {
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
             res.json(product);
           }
         });
       });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/activate')
  .post(function(req, res) {
    console.log("activating product " + req.params.product_id);

    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err) {
        return res.status(400).send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
        product.product_status = "Active";

        product.save(function(err) {
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
            res.json(revision.products);
          }
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/lists/:list_id')
  .post(function(req, res) {
    console.log("adding a list to product " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err)
        res.send(err);

      List.findById(req.params.list_id, function(err, list) {
        if(err) {
          res.status(400).send(err);
        }

        Product.findById(req.params.product_id, function(err, product) {
          product.lists.push(list);

          product.save(function(err) {
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
              res.json(product);
            }
          });
        });
      });
    });
  })
  .delete(function(req, res) {
    console.log("remove a list " + req.params.list_id + " from product " + req.params.product_id + " in product line revision " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err) {
        return res.status(400).send(err);
      }

      List.findById(req.params.list_id, function(err, list) {
        if(err) {
          return res.status(400).send(err);
        }

        Product.findById(req.params.product_id, function(err, product) {
          if(!product) {
            return res.status(404).send("Product not found.");
          }

          product.lists.remove(list._id);

          product.save(function(err) {
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
              res.json(product);
            }
          });
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/set_custom_status')
  .post(function(req, res) {
    console.log("setting custom status for product " + req.params.product_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err) {
        return res.send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
        product.custom_status = req.body.custom_status;

        product.save(function(err) {
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
            res.json(product);
          }
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/locations/:location_id')
  .post(function(req, res) {
    console.log("adding a location to product " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err)
        res.send(err);

      Location.findById(req.params.location_id, function(err, location) {
        if(err) {
          return res.status(400).send(err);
        }

        Product.findById(req.params.product_id, function(err, product) {
          if(err) {
            return res.status(400).send(err);
          }
          if(!product) {
            return res.status(404).send("Product not found.");
          }
          var product_location = {};
          product_location.location = location._id;
          product.locations.push(product_location);

          product.save(function(err) {
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
              res.json(product);
            }
          });
        });
      });
    });
  })
  .delete(function(req, res) {
    console.log("remove a location from product " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err)
        res.send(err);

      Location.findById(req.params.location_id, function(err, location) {
        if(err) {
          res.status(400).send(err);
        }

        Product.findById(req.params.product_id, function(err, product) {
          product.locations.remove(location._id);

          product.save(function(err) {
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
              res.json(product);
            }
          });
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/subscriber_classes/:subscriber_class_id')
  .post(function(req, res) {
    console.log("adding a subscriber class to product " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err)
        res.send(err);

      SubscriberClass.findById(req.params.subscriber_class_id, function(err, subscriber_class) {
        if(err) {
          res.status(400).send(err);
        }

        Product.findById(req.params.product_id, function(err, product) {
          var product_subscriber_class = {};

          product_subscriber_class.subscriber_class = subscriber_class._id;

          product.subscriber_classes.push(product_subscriber_class);

          product.save(function(err) {
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
              res.json(product);
            }
          });
        });
      });
    });
  })
  .delete(function(req, res) {
    console.log("remove a subscriber class from product " + req.params.product_line_revision_id);
    ProductLineRevision.findById(req.params.product_line_revision_id, function(err, revision) {
      if(err)
        res.send(err);

      SubscriberClass.findById(req.params.subscriber_class_id, function(err, subscriber_class) {
        if(err) {
          res.status(400).send(err);
        }

        Product.findById(req.params.product_id, function(err, product) {
          product.subscriber_classes.remove(subscriber_class._id);

          product.save(function(err) {
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
              res.json(product);
            }
          });
        });
      });
    });
  });

router.route('/:product_line_revision_id/products/:product_id/subscriber_classes/:subscriber_class_id/pricing/:pricing_field_id')
  .put(function(req, res) {
    console.log("update pricing for product " + req.params.product_id + " and subscriber class " + req.params.subscriber_class_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .populate({
      path: 'pricing.pricing_field',
      model: 'PricingField'
    })
    .exec(function(err, revision) {
      if(err) {
        res.status(404).send(err);
      }

      Product.findById(req.params.product_id)
      .populate({
        path: 'subscriber_classes.subscriber_class',
        model: 'SubscriberClass'
      })
      .exec(function(err, product) {
        PricingField.findById(req.params.pricing_field_id, function(err, pricing_field) {
           if(err) {
             return res.status(400).send(err);
           }
           if(!pricing_field) {
             return res.status(404).send("Pricing field not found.");
           }

           product.subscriber_classes.forEach(function(product_subscriber_class) {
             console.log(product_subscriber_class);
             if(product_subscriber_class._id == String(req.params.subscriber_class_id)) {
               var price_found = false;
               product_subscriber_class.pricing.forEach(function(price) {
                 if(String(price.pricing_field)== String(pricing_field._id)) {
                   price.value = req.body.new_value;

                   price_found = true;
                 }
               });
               if(!price_found) {
                 var pricing = {};

                 pricing.pricing_field = pricing_field._id;
                 pricing.value = req.body.new_value;

                 product_subscriber_class.pricing.push(pricing);
               }
             }
           });

           console.log(product);
            product.save(function(err) {
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
                res.json(product);
              }
            });
          });
        });
    });
  });

router.route('/:product_line_revision_id/products/:product_id/subscriber_classes/:subscriber_class_id/markup_calculators/:markup_calculator_id')
  .put(function(req, res) {
    console.log("update markup calculator for product " + req.params.product_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .exec(function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
         var markup_calculator = revision.markup_calculators.id(req.params.markup_calculator_id);
         if(!product) {
           return res.status(404).send("Product not found.");
         }
         if(!markup_calculator) {
           return res.status(404).send("Markup calculator not found.");
         }
         product.subscriber_classes.forEach(function(product_subcriber_class) {
           if(product_subcriber_class._id == String(req.params.subscriber_class_id)) {
             product_subcriber_class.markup_calculator = markup_calculator;
           }
         });

        product.save(function(err) {
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
            res.json(product);
          }
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/subscriber_classes/:subscriber_class_id/display_price/:pricing_field_id')
  .put(function(req, res) {
    console.log("update display price for product " + req.params.product_id + " at subscriber level " + req.params.subscriber_class_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .exec(function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
         if(!product) {
           return res.status(404).send("Product not found.");
         }
         var pricing_field = revision.pricing_fields.id(req.params.pricing_field_id);
         if(!pricing_field) {
           return res.status(404).send("Pricing field not found.");
         }
         product.subscriber_classes.forEach(function(product_subscriber_class) {
           if(product_subscriber_class._id == String(req.params.subscriber_class_id)) {
             product_subscriber_class.display_price = pricing_field;
           }
         });

        product.save(function(err) {
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
            res.json(product);
          }
        });
      });
    });
  });

router.route('/:product_line_revision_id/products/:product_id/locations/:location_id/pricing/:pricing_field_id')
  .put(function(req, res) {
    console.log("update pricing for product " + req.params.product_id + " and location " + req.params.location_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .populate({
      path: 'pricing.pricing_field',
      model: 'PricingField'
    })
    .exec(function(err, revision) {
      if(err) {
        res.status(404).send(err);
      }

      Product.findById(req.params.product_id)
      .populate({
        path: 'locations.location',
        model: 'Location'
      })
      .exec(function(err, product) {
        var location = revision.locations.id(req.params.location_id);

        PricingField.findById(req.params.pricing_field_id, function(err, pricing_field) {
           if(err) {
             return res.status(400).send(err);
           }
           if(!pricing_field) {
             return res.status(404).send("Pricing field not found.");
           }

           product.locations.forEach(function(product_location) {
             if(product_location._id == String(req.params.location_id)) {
               var price_found = false;
               product_location.pricing.forEach(function(price) {
                 if(String(price.pricing_field)== String(pricing_field._id)) {
                   price.value = req.body.new_value;

                   price_found = true;
                 }
               });
               if(!price_found) {
                 var pricing = {};

                 pricing.pricing_field = pricing_field._id;
                 pricing.value = req.body.new_value;

                 product_location.pricing.push(pricing);
               }
             }
           });

            product.save(function(err) {
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
                res.json(product);
              }
            });
          });
        });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/locations/:location_id/markup_calculators/:markup_calculator_id')
  .put(function(req, res) {
    console.log("update markup calculator for product " + req.params.product_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .exec(function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
         var markup_calculator = revision.markup_calculators.id(req.params.markup_calculator_id);
         if(!product) {
           return res.status(404).send("Product not found.");
         }
         if(!markup_calculator) {
           return res.status(404).send("Markup calculator not found.");
         }
         var location = revision.locations.id(req.params.location_id);
         var found = false;

         product.locations.forEach(function(product_location) {
           if(product_location._id == String(req.params.location_id)) {
             product_location.markup_calculator = markup_calculator;

             found = true;
           }
         });

        product.save(function(err) {
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
            res.json(product);
          }
        });
      });
    });
  });
router.route('/:product_line_revision_id/products/:product_id/locations/:location_id/display_price/:pricing_field_id')
  .put(function(req, res) {
    console.log("update display price for product " + req.params.product_id + " at location " + req.params.location_id);

    ProductLineRevision.findById(req.params.product_line_revision_id)
    .exec(function(err, revision) {
      if(err) {
        return res.status(404).send(err);
      }

      Product.findById(req.params.product_id, function(err, product) {
         if(!product) {
           return res.status(404).send("Product not found.");
         }
         var pricing_field = revision.pricing_fields.id(req.params.pricing_field_id);
         if(!pricing_field) {
           return res.status(404).send("Pricing field not found.");
         }
         product.locations.forEach(function(product_location) {
           if(product_location._id == String(req.params.location_id)) {
             product_location.display_price = pricing_field;
           }
         });

        product.save(function(err) {
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
            res.json(product);
          }
        });
      });
    });
  });
  
module.exports = router;
