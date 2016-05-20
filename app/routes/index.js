var express = require('express')
	, router = express.Router()
	, user = require('./user')
  , db = require('../models')

/* GET Main */
router.get('/', function(req, res, next) {
  db.Blog.findAll()  //{ where: {id: 1}} limit to top 2 chosen, shorter posts
          .then(function(blogs){
            res.render('homepage/index', { title: 'The ACT-W Conference Home Page', blogs: blogs });
          })
          .catch(function(){
            console.error('Blog lookup failed!');
            res.render('homepage/index', { title: 'The ACT-W Conference Home Page' });
          })
  var sess = req.session;
  if (sess.views)
    sess.views++;
  else
    sess.views = 1;
  console.log('Homepage session views', sess.views);
});

/* GET Portland */
router.get('/pdx', function(req, res, next) {
  res.render('city-pages/pdx/index', { title: 'Portland ACT-W Conference', city: 'Portland' });
});

/* GET Seattle */
router.get('/seattle', function(req, res, next) {
  res.render('city-pages/seattle/index', { title: 'Seattle ACT-W Conference', city: 'Seattle' });
});

/* GET San Francisco */
router.get('/sf', function(req, res, next) {
  res.render('city-pages/sf/index', { title: 'San Francisco ACT-W Conference', city: 'San Francisco' });
});

/* GET Austin */
router.get('/atx', function(req, res, next) {
  res.render('city-pages/atx/index', { title: 'Austin ACT-W Conference', city: 'Austin' });
});

/* GET Boston */
router.get('/boston', function(req, res, next) {
  res.render('city-pages/boston/index', { title: 'Boston ACT-W Conference', city: 'Boston' });
});

/* GET Chicago */
router.get('/chicago', function(req, res, next) {
  res.render('city-pages/chicago/index', { title: 'Chicago ACT-W Conference', city: 'Chicago' });
});

/* GET New York */
router.get('/nyc', function(req, res, next) {
  res.render('city-pages/nyc/index', { title: 'New York ACT-W Conference', city: 'New York City' });
});

/* GET Blog */
router.get('/blog', function(req, res, next) {
  db.Blog.findAll()
    .then(function(blogs){
      for (var blog in blogs){
        blogs[blog].likeCount = 0;
        blogs[blog].loveCount = 0;
        blogs[blog].thanksCount = 0;
        blogs[blog].hahaCount = 0;
        blogs[blog].wowCount = 0;
        blogs[blog].sadCount = 0;
        blogs[blog].angryCount = 0;

        db.BlogRxn.findAll({ where: {blogId: blogs[blog].id} }).then(function(blogRxns){
          for (var blogRxn in blogRxns){
            switch (blogRxns[blogRxn].rxn) {
            case 'Like':
              blogs[blog].likeCount++;
              break;
            case 'Love':
              blogs[blog].loveCount++;
              break;
            case 'Thanks':
              blogs[blog].thanksCount++;
              break;
            case 'Haha':
              blogs[blog].hahaCount++;
              break;
            case 'Wow':
              blogs[blog].wowCount++;
              break;
            case 'Sad':
              blogs[blog].sadCount++;
              break;
            case 'Angry':
              blogs[blog].angryCount++;
              break;
            default:
              break;
            }
          }

          res.render('blog',
                     {
                       title: 'The ACT-W Conference Blog Page',
                       blogs: blogs,
                     });
        }).catch(function(){
          console.error('Reaction lookup failed!');
          res.render('blog',
                     {
                       title: 'The ACT-W Conference Blog Page',
                       blogs: null
                     });
        });
      }
    });
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
