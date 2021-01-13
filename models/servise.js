const mongoose = require('mongoose');

const ServiseSchema = {
  title: String,
  descriptions: String,
  price: Number,
}


module.exports = mongoose.model('Servise', ServiseSchema);
