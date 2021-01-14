const mongoose = require('mongoose');
const Master = require('../models/master');
const Service = require('../models/service');

const mesters = [];
const services = [];

//   title: String,
//   description: String,
//   price: Number,
//   imgUri: String,
//   category: String,
services.push(new Service({ title: "Стрижка", description: "Подстричь-побрить", price: 1000, imgUri: "тут будет ссылка на фотку", category: "" }));
services.push(new Service({ title: , description: , price: , imgUri: , category: }));
masters.push(new Masters({ firstName:, lastName:, description:, createdAt:, imgUri: }));

const seedData = async () => {
  await Service.insertMany(services);
  await Master.insertMany(masters);
}

seedData();
