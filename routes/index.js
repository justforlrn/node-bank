var router = require('express').Router();
var passport = require('passport');
var BankAccountModel = require('../models/bank-account');
var UserModel = require('../models/user');
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user) {
    // var bank = BankAccountModel.findOne({ number: '4744516798' })
    //   .populate('holdName')
    //   .exec(function (err, arr) {
    //     if (err) console.log(err);
    //     console.log(arr);
    //   });
    return res.json(req.user);
  } else res.render('index', { title: 'Node Bank', hasError: false });
});
router.post('/', function (req, res, next) {
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
