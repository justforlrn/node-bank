var router = require('express').Router();
var BankAccountModel = require('../models/bank-account');
var UserModel = require('../models/user');

var checkLogin = function (req, res, next) {
  if (!req.user) {
    return res.redirect('/');
  }
  next();
};

router.use('/', checkLogin);

router
  .route('/')
  .get((req, res, next) => {
    UserModel.findOne(
      {
        email: req.user.email,
      },
      '_id name'
    )
      .populate('bankAccount', '_id number balance transfers')
      .exec((err, account) => {
        res.render('transfer', {
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
  .post((req, res, next) => {
    var bankNumber = req.body.input_number;
    var transferValue = Number.parseInt(req.body.input_value, 10);
    BankAccountModel.findOne(
      {
        number: bankNumber,
      },
      async function (err, toAccount) {
        console.log('toAccount');
        console.log(toAccount);
        if (err) console.log(err);
        toAccount.balance += transferValue;
        UserModel.findOne(
          {
            email: req.user.email,
          },
          '_id'
        )
          .populate('bankAccount', '_id number balance transfers')
          .exec(function (err, fromAccount) {
            console.log('fromAccount');
            console.log(fromAccount);
            if (err) console.log(err);
            if (!fromAccount)
              return res.json({
                hasError: true,
                msg: 'Account dose not exist',
              });
            fromAccount.bankAccount.balance -= transferValue;
            fromAccount.bankAccount.transfers.push({
              type: 'out',
              fromToNumber: toAccount.number,
              value: transferValue,
            });
            toAccount.transfers.push({
              type: 'in',
              fromToNumber: fromAccount.bankAccount.number,
              value: transferValue,
            });
            fromAccount.bankAccount.save();
            toAccount.save();
          });
        return res.redirect('/transfer');
      }
    );
  });

router.get('/get-holder', function (req, res) {
  BankAccountModel.findOne(
    {
      number: req.query.input_number,
    },
    function (err, account) {
      if (err) console.log(err);
      if (!account) {
        return res.json({
          hasError: true,
          msg: 'Account dose not exist',
        });
      }
      res.json({
        hasError: false,
        name: account.name,
      });
    }
  );
});

module.exports = router;
