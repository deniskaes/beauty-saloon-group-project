const mongoose = require('mongoose');

const ServiceSchema = {
  title: String,
  description: String,
  price: Number,
  imgUri: String,
}


module.exports = mongoose.model('Service', ServiceSchema);
