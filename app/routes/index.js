var express = require('express')
  , router = express.Router()
  , user = require('./user')
  , db = require('../models')
  , Sequelize = require('sequelize')
  , Promise = Sequelize.Promise

/* GET Main */
router.get('/', function(req, res, next) {
  res.render('homepage/index', { title: 'ChickTech Career Events' });
  var sess = req.session;
  if (sess.views)
    sess.views++;
  else
    sess.views = 1;
  console.log('Homepage session views', sess.views);
});

/* GET Portland */
router.get('/pdx', function(req, res, next) {
  res.render('city-pages/pdx/index', { title: 'Portland ChickTech Career Events', city: 'Portland' });
});

/* GET Seattle */
router.get('/seattle', function(req, res, next) {
  res.render('city-pages/seattle/index', { title: 'Seattle ChickTech Career Events', city: 'Seattle' });
});

/* GET San Francisco */
router.get('/sf', function(req, res, next) {
  res.render('city-pages/sf/index', { title: 'San Francisco ChickTech Career Events', city: 'San Francisco' });
});

/* GET Austin */
router.get('/atx', function(req, res, next) {
  res.render('city-pages/atx/index', { title: 'Austin ChickTech Career Events', city: 'Austin' });
});

/* GET Boston */
router.get('/boston', function(req, res, next) {
  res.render('city-pages/boston/index', { title: 'Boston ChickTech Career Events', city: 'Boston' });
});

/* GET Chicago */
router.get('/chicago', function(req, res, next) {
  res.render('city-pages/chicago/index', { title: 'Chicago ChickTech Career Events', city: 'Chicago' });
});

/* GET New York */
router.get('/nyc', function(req, res, next) {
  res.render('city-pages/nyc/index', { title: 'New York ChickTech Career Events', city: 'New York City' });
});

/* AUTH */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', user.authenticate);

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    //TODO: pop up that says you have been logged out
    console.log('Session destroyed');
  })
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/register', user.register)

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });

module.exports = router;
