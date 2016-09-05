// app/models/pull_request.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account         = require('../models/account');
var Product      = require('../models/product');
var ProductLineRevision     = require('../models/product_line_revision');

var PullRequestSchema   = new Schema({
  _downstream_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  _upstream_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  products: [Product.schema],
},
{
  timestamps: true
});

module.exports = mongoose.model('PullRequest', PullRequestSchema);
