const mongoose = require('mongoose');

const UserSchema = {
  username: String,
  password: String,
  createdAt: Date,
  role: String,
}


module.exports = mongoose.model('User', UserSchema);
