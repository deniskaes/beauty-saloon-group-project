const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const salt = bcrypt.genSaltSync(10);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reg', (req, res) => {
  res.render('reg', { layout: false });
});

router.post('/reg', async (req, res) => {
  const { login, password } = req.body;
  const cryptedPass = await bcrypt.hash(password, salt);
  const admin = new User({ username: login, password: cryptedPass });
  await admin.save();
  res.send('registration success')
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

module.exports = router;
