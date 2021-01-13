const mongoose = require('mongoose');

const MasterSchema = {
  firstName: String,
  lastName: String,
  desctiption: String,
  createdAt: Date,
  fotoIndex: String,
}


module.exports = mongoose.model('Master', MasterSchema);
