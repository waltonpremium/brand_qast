// app/models/media.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account      = require('../models/account');

var MediaSchema = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  filename: {
    type: String,
    required: true
  },
  tags: [String]
},
{
    timestamps: true
});

module.exports = mongoose.model('Media', MediaSchema);
