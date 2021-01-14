require('dotenv').config();

const mongoose = require('mongoose');
const Master = require('../models/master');
const Service = require('../models/service');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const masters = [];
const services = [];

//   title: String,
//   description: String,
//   price: Number,
//   imgUri: String,
//   category: String,
services.push(new Service({ title: "Женская стрижка", description: "Подстричь-побрить", price: 2000, imgUri: "01", category: "Парикмахерская" }));

services.push(new Service({ title: "Мужская стрижка", description: "Подстричь-побрить", price: 1500, imgUri: "02", category: "Парикмахерская" }));
services.push(new Service({ title: "Бритье бороды", description: "Конкретно побрить", price: 1000, imgUri: "03", category: "Парикмахерская" }));
services.push(new Service({ title: "Детская стрижка", description: "Подстричь, не побрить", price: 800, imgUri: "04", category: "Парикмахерская" }));
services.push(new Service({ title: "Маникюр", description: "Ноготочки", price: 1200, imgUri: "05", category: "Маникюр" }));
services.push(new Service({ title: "Педикюр", description: "Ноготочки на ногах", price: 1100, imgUri: "06", category: "Маникюр" }));
services.push(new Service({ title: "Наращивание ногтей", description: "Наращивание ногтей где угодно", price: 1400, imgUri: "07", category: "Маникюр" }));
services.push(new Service({ title: "Массаж", description: "Расслабляющий массаж", price: 2000, imgUri: "08", category: "Косметология" }));
services.push(new Service({ title: "Ботокс", description: "Чтобы губы были пю", price: 3700, imgUri: "09", category: "Косметология" }));
services.push(new Service({ title: "Лифтинг", description: "Что бы это ни было", price: 2500, imgUri: "10", category: "Косметология" }));

masters.push(new Master({ firstName: "Татьяна", lastName: "Восьмиглазова", description: "Очень хороший стилист, только говорит непонятно", imgUri: "101"}));
masters.push(new Master({ firstName: "Ричард", lastName: "Сапогов", description: "Лучший парикмахер в городе, стрижет блестяще", imgUri: "102"}));
masters.push(new Master({ firstName: "Игорь", lastName: "Катамаранов", description: "Бывает пьет, бывает не пьет", imgUri: "103"}));
masters.push(new Master({ firstName: "Артур", lastName: "Пирожков", description: "Тудым-сюдым", imgUri: "104"}));

const seedData = async () => {
  await Service.insertMany(services);
  await Master.insertMany(masters);
}

seedData();
