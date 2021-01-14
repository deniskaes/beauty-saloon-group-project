const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Master = require('../models/master');
const Service = require('../models/service');

const salt = bcrypt.genSaltSync(10);

router.use((req, res, next) => {
  if (req.session?.username) {
    res.locals.username = req.session.username;
  }
  next();
});

const checkPermissions = (req, res, next) => {
  if (req.session?.username) {
    next();
  }
  res.redirect('/');
};

router.get('/', function (req, res) {
  res.render('index', { username: req.session.username });
});

router.get('/reg', (req, res) => {
  res.render('reg');
});

router.post('/reg', async (req, res) => {
  const { login, password } = req.body;
  const cryptedPass = await bcrypt.hash(password, salt);
  const admin = new User({ username: login, password: cryptedPass });
  await admin.save();
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ username: login });
  if (bcrypt.compare(password, user.password)) {
    req.session.username = login;
  }
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/masters', async (req, res) => {
  console.log(req);
  const masters = await Master.find();
  // res.render('masters', { user, masters });
  res.send('Туту мастера уже едут')
});

router.get('/masters/add', async (req, res) => {

  // res.render('masters', { user, masters });
  res.send('Туту мастер добавление отрендерить форму для добавления')
});

router.get('/services', async (req, res) => {
	const services = await Service.find();
	console.log('services', services);
  // res.render('services', { user, services });
  res.render('services', { services });
});

router.get('/services/:id', async (req, res) => {
  const serviceId = req.params.id;
  const serviceOne = await Service.findById(serviceId);
  res.render('serviceOne', { user, serviceOne })
});

router.get('/masters/:id', async (req, res) => {
  const masterId = req.params.id;
  const masterOne = await Master.findById(masterId);
  res.render('masterOne', { user, masterOne })
})

module.exports = router;
