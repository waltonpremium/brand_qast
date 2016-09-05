var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var Product = require('../models/product');
var ProductLine = require('../models/product_line');

router.use(function(req, res, next) {
  console.log("routing to product line products api");

  next();
});
// on routes that end in /product_line_products
// ----------------------------------------------------
router.route('/')
  .post(function(req, res) {
    ProductLine.findById(req.params.product_line_id, function(err, product_line) {
      if(err)
        res.send(err);

      var product = new Product();

      product.name = req.body.name;
      product.brand_name = req.body.brand_name;
      product.description = req.body.description;
      product.sku = req.body.sku;
      product.manufacturer_number = req.body.manufacturer_number;
      product.upc = req.body.upc;
      product.link = req.body.link;
      product.name = req.body.notes;

      product_line.products.push(product);

      product_line.save(function(err) {
        if(err)
          res.send(err);

        res.json(product);
      });
    });
  })
  .get(function(req, res) {
    ProductLine.findById(req.params.product_line_id, function(err, product_line) {
      if(err)
        res.send(err);

      res.json(product_line.products);
    });
  });
router.route('/:product_id')
  .delete(function(req, res) {
    Product.findById(req.params.product_id, function(err, product_line) {
      if(err)
        res.send(err);

      //product_line.products.id(req.params.product_id).remove();

      product_line.save(function(err) {
        if(err)
          res.send(err);

        res.json({ message: 'Successfully removed product' });
      });
    });
  });
