var router = require('express').Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var { JWTOptions } = require('../services/auth/passport');
var BankAccountModel = require('../models/bank-account');
var UserModel = require('../models/user');

router.use('/', (req, res, next) => {
  if (req.user) return next();
  else res.redirect('/');
});

router
  .route('/')
  .get((req, res, next) => {
    UserModel.findOne({ email: req.user.email }, '_id name')
      .populate('bankAccount', '_id number balance transfers')
      .exec((err, account) => {
        res.render('api', {
          error: false,
          title: 'Transfer',
          user: {
            name: account.name,
            number: account.bankAccount.number,
            balance: account.bankAccount.balance,
            hasTransfer:
              account.bankAccount.transfers.length > 0 ? true : false,
            transfers: account.bankAccount.transfers,
          },
        });
      });
  })
  .post((req, res) => {
    var token = jwt.sign({ email: req.user.email }, JWTOptions.secretKey, {
      expiresIn: '365 days',
    });
    res.json({ token: token });
  });

router.route('/my-data').get(
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (!user) {
        return res.json({ err: 'Unknown' });
      } else {
        req.data = user;
        next();
      }
    })(req, res, next);
  },
  (req, res, next) => {
    res.json(req.data);
  }
);

module.exports = router;
