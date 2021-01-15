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
    return next();
  }
   res.redirect('/');
};

router.get('/', function (req, res) {
  res.render('index', { username: req.session.username });
});

router.get('/reg', (req, res) => {
  res.render('reg');
});

router.get('/contacts', (req, res) => {
  res.render('contacts');
});

router.post('/reg', async (req, res) => {
  const { login, password } = req.body;
  const cryptedPass = await bcrypt.hash(password, salt);
  const admin = new User({ username: login, password: cryptedPass });
  await admin.save();
  req.session.username = login;
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
  const masters = await Master.find();
  const username = req.session?.username;
  console.log(username);
  res.render('masters', { username, masters });
});

router.get('/masters/add', checkPermissions, async (req, res) => {
  res.render('masterEdit');
});

router.get('/services', async (req, res) => {
  const services = await Service.find();
  const username = req.session?.username;
  res.render('services', { username, services });
});

router.get('/services/add', checkPermissions, async (req, res) => {
  console.log("add service");
  res.render('serviceEdit');
});

router.get('/services/edit/:id', async (req, res) => {
  const id = req.params.id;
  const service = await Service.findById(id);
  res.render('serviceEdit', { service });
});

router.post('/services/save', async (req, res) => {
  const { id, title, description, price, imgUri, category } = req.body;
  if (id) {
    await Service.findByIdAndUpdate(id, { title, description, price, imgUri, category });
  } else {
    const newService = new Service({ title, description, price, imgUri, category });
    await newService.save();
  }
  res.redirect('/services');
});

router.get('/services/delete/:id', checkPermissions, async (req, res) => {
  const id = req.params.id;
  await Service.findByIdAndDelete(id);
  res.redirect('/services');
});

router.get('/masters/edit/:id', async (req, res) => {
  const id = req.params.id;
  const master = await Master.findById(id);
  res.render('masterEdit', { master });
});

router.post('/masters/save', async (req, res) => {
  const { id, firstName, lastName, description, createdAt, imgUri, addImage } = req.body;
  console.log(id, firstName, lastName, description, imgUri, addImage);
  if (id) {
    await Master.findByIdAndUpdate(id, { firstName, lastName, description, imgUri });
  } else {
    const newMaster = new Master({ firstName, lastName, description, imgUri });
    await newMaster.save();
  }
  res.redirect('/masters');
});

router.get('/masters/delete/:id', checkPermissions, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Master.findByIdAndDelete(id);
  res.redirect('/masters');
});


module.exports = router;
