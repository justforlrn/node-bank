var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transferSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    fromToNumber: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

var BankAccountSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    transfers: [transferSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('BankAccount', BankAccountSchema);
