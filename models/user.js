var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BankAccountModel = require('./bank-account');
const bcrypt = require('bcryptjs');

var UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bankAccount: {
      type: Schema.Types.ObjectId,
      ref: 'BankAccount',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  user = this;
  if (this.isModified('password') || this.isNew) {
    user.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }

  // BankAccountModel.create(
  //   {
  //     number: Math.floor(Math.random() * 8999999999) + 1000000000,
  //     holdName: user._id,
  //     balance: 0,
  //   },
  //   function (err, user) {
  //     if (err) {
  //       console.log(err);
  //       //return done(null, false, { msg: 'Cannot create Bank Account' });
  //     }
  //   }
  // );

  next();
});

UserSchema.methods.comparePassword = function (reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
