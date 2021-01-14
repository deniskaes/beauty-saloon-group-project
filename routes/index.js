const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const salt = bcrypt.genSaltSync(10);

router.use((req, res, next) => {
  if (req.session?.username) {
    res.locals.username = req.session.username;
  }
  next();
});

router.get('/', function (req, res) {
  res.render('index', { username: req.session.username });
});

router.get('/reg', (req, res) => {
  res.render('reg', { layout: false });
});

router.post('/reg', async (req, res) => {
  const { login, password } = req.body;
  const cryptedPass = await bcrypt.hash(password, salt);
  const admin = new User({ username: login, password: cryptedPass });
  await admin.save();
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login', { layout: false });
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

module.exports = router;
