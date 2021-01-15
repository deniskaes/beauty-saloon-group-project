const mongoose = require('mongoose');

const MasterSchema = {
  firstName: String,
  lastName: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imgUri: String,
}


module.exports = mongoose.model('Master', MasterSchema);
