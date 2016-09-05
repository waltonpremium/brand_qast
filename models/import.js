// app/models/media.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Account      = require('../models/account');
var Import       = require('../models/import');

var ImportSchema = new Schema({
  _account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  filename: {
    type: String,
    required: true
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Import', ImportSchema);
