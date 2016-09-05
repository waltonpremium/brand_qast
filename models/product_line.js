// app/models/product_line.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var List         = require('../models/list');
var Location     = require('../models/location');
var SubscriberClass     = require('../models/subscriber_class');
var ProductLineRevision = require('../models/product_line_revision');

var ProductLineSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    _account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    _revisions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductLineRevision'
    }],
    _current_revision: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductLineRevision',
      required: true
    }
},
{
    timestamps: true
});

ProductLineSchema.methods.createProductLineRevision = function(callback) {
  var product_line_revision = new ProductLineRevision();

  product_line_revision.products = [];
  product_line_revision.lists = this._account._lists;
  product_line_revision.locations = this._account._locations;
  product_line_revision.subscriber_classes = this._account._subscriber_classes;
  product_line_revision.pricing_fields = this._account._pricing_fields;
  product_line_revision._product_line = this;
  product_line_revision.committed = false;

  callback(product_line_revision);
};

module.exports = mongoose.model('ProductLine', ProductLineSchema);
