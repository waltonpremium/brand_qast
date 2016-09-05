// app/models/subscriber_class.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var MarkupCalculator = require('../models/markup_calculator');

var SubscriberClassSchema   = new Schema({
  name: {
    type: String,
    required: true
  },
  notes: String,
  _default_calculator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarkupCalculator'
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('SubscriberClass', SubscriberClassSchema);
