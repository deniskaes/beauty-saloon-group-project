const mongoose = require('mongoose');

const MasterSchema = {
  firstName: String,
  lastName: String,
  description: String,
  createdAt: Date,
  imgUri: String,
}


module.exports = mongoose.model('Master', MasterSchema);
