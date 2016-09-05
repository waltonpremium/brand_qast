// app/models/subscriber_class.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomAttributeSchema   = new Schema({
  group_name: {
    type: String,
    required: true
  },
  attributes: [{
    name: {
      type: String,
      required: true
    },
    default_value: {
      type: String,
      required: true
    },
    sample_value: {
      type: String,
      required: true
    }
  }]
},
{
    timestamps: true
});

module.exports = mongoose.model('CustomAttribute', CustomAttributeSchema);
