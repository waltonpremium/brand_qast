// app/models/widget.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ProductLine  = require('../models/product_line');

var WidgetSchema   = new Schema({
  name: {
    type: String,
    required: true
  },
  widget_type: String,
  _product_line: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductLine'
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('Widget', WidgetSchema);
