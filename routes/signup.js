var router = require('express').Router();
var passport = require('passport');
var { validationResult } = require('express-validator');
var { validateUserSignup } = require('../services/auth/validator');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) res.json(req.user);
  res.redirect('/');
};

router.get('/', function (req, res, next) {
  if (req.user) {
    return res.json(req.user);
  } else res.render('signup', { title: 'Sign Up', hasError: false });
});

router.post('/', validateUserSignup(), (req, res, next) => {
  var errors = validationResult(req)
    .array()
    .map((error) => {
      return error.msg;
    });
  if (errors.length > 0) {
    return res.render('signup', {
      title: 'Sign Up',
      hasError: true,
      errors: errors,
    });
  }
  passport.authenticate('signup', function (err, user, info) {
    if (info) {
      return res.render('signup', {
        title: 'Sign Up',
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
      return res.json(user.email);
    });
  })(req, res, next);
});

module.exports = router;
