var router = require('express').Router();
var passport = require('passport');

router.use('/', (req, res, next) => {
  if (req.session.visited) {
    return next();
  }
  req.session.visited = true;
  return res.redirect('/guide');
});

var checkLogin = function (req, res, next) {
  if (req.user) {
    return res.redirect('/transfer');
  }
  next();
};

router.route('/guide').get((req, res, next) => {
  res.render('guide');
});

router.get('/', checkLogin, function (req, res, next) {
  res.render('index', { title: 'Node Bank', hasError: false });
});
router.post('/', checkLogin, function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (info) {
      return res.render('index', {
        title: 'Sign in',
        hasError: true,
        errors: [info.msg],
      });
    }
    if (err) {
      return next(err);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/transfer');
    });
  })(req, res, next);
});

module.exports = router;
