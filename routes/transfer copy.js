var router = require('express').Router();
var BankAccountModel = require('../models/bank-account');
var UserModel = require('../models/user');

router
  .route('/')
  .get((req, res, next) => {
    // if (!req.user) return res.redirect('/');
    // else return res.render('transfer', { title: 'Transfer', hasError: false });
    res.render('transfer', { title: 'Transfer', hasError: false });
  })
  .post((req, res, next) => {
    BankAccountModel.findOne(
      { number: req.body.bank_number },
      async function (err, receivedAccount) {
        if (err) console.log(err);
        receivedAccount.balance += Number.parseInt(req.body.transfer_value, 10);
        //Only return balance field
        await BankAccountModel.findOne(
          { 'holdName.email': req.user },
          'balance',
          (err, transAccount) => {
            if (err) console.log(err);
            transAccount.balance -= Number.parseInt(
              req.body.transfer_value,
              10
            );
            transAccount.save();
          }
        );
        receivedAccount.save();
        return res.json('success');
      }
    );
  });

router.get('/get-holder', (req, res) => {
  console.log('TEST');
  UserModel.findOne({ email: 'email@email.com' })
    .populate('bankAccount')
    .exec(function (err, account) {
      console.log('BCSAV');
      if (err) console.log(err);

      console.log(account);
    });
  // UserModel.findOne(
  //   { 'bankAccount.number': req.query.bank_number },
  //   (err, user) => {
  //     if (err) console.log(err);
  //     if (!user) {
  //       console.log(user);
  //       console.log('B');
  //       return res.json({ hasError: true, msg: 'Account dose not exist' });
  //     }
  //     console.log('A');
  //     res.json({ hasError: false, holder: user.fullName });
  //   }
  // );
  // BankAccountModel.findOne({ number: req.query.bank_number })
  //   .populate('holdName')
  //   .exec((err, account) => {
  //     if (err) console.log(err);
  //     if (!account)
  //       return res.json({ hasError: true, msg: 'Account dose not exist' });
  //     res.json({ hasError: false, holder: account.holdName.fullName });
  //   });
});

module.exports = router;
