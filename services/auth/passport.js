var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var UserModel = require('../../models/user');
var BankAccountModel = require('../../models/bank-account');
// var chalk = require('chalk');
// const bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
  done(null, user.email); //return from strategy
});

passport.deserializeUser(function (email, done) {
  //console.log(email); //get from above
  UserModel.findById({ email: email }, function (err, user) {
    done(null, { email: email });
  });
});

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'input_email',
      passwordField: 'input_password',
      passReqToCallback: true, //Cho phép truy cập các giá trị của req gửi lên
    },
    (req, email, password, done) => {
      UserModel.create(
        {
          email: req.body.input_email,
          password: req.body.input_password,
          name: req.body.input_name,
        },
        (err, user) => {
          if (err) {
            console.log(err);
            return done(null, false, { msg: 'Email or Person ID existed' });
          }
          BankAccountModel.create(
            {
              number: Math.floor(Math.random() * 9999999999) + 1000000000,
              name: user.name,
              balance: 1000000,
            },
            (err, account) => {
              if (err) console.log(err);
              user.bankAccount = account._id;
              user.save();
            }
          );
          return done(null, { email: email });
        }
      );
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'input_email',
      passwordField: 'input_password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      var user = await UserModel.findOne({ email });
      if (!user) {
        return done(null, false, { msg: 'Email not found' });
      }

      if (!user.comparePassword(password)) {
        return done(null, false, { msg: 'Wrong password' });
      }
      return done(null, { email: email });
    }
  )
);
