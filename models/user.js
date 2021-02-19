var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
  next();
});

UserSchema.methods.comparePassword = function (reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
