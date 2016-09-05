// app/models/list.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ListSchema   = new Schema({
  name: {
    type: String,
    required: true
  }
},
{
    timestamps: true
});

module.exports = mongoose.model('List', ListSchema);
