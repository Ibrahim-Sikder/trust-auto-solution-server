const mongoose = require("mongoose");

const moneyReceiptSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
    },

    thanks_from: {
      type: String,
      // required: [true],
    },
    against_bill_no: {
      type: String,
      // required: [true],
    },
    vehicle_no: {
      type: Number  ,

      type: String,
    },
    cheque_no: {
      type: String,
      // required: [true ],
    },

    date_one: {
      type: String,
      // required: [true ],
    },

    bank: {
      type: String,
      // required: [true ],
    },

    date_two: {
      type: String,
      // required: [true ],
    },
    total_amount: {
      type: Number,
      // required: [true ],
    },
    advance: {
      type: Number,
      // required: [true ],
    },
    remaining: {
      type: Number,
      // required: [true ],
    },

    taka_in_word: {
      type: String,
      // required: [true ],
    },
  },
  {
    timestamps: true,
  }
);

const MoneyReceipt = mongoose.model("MoneyReceipt", moneyReceiptSchema);

module.exports = MoneyReceipt;
