const mongoose = require("mongoose");

const moneyReceiptSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      // required: [true, "Username is required."],
    },
    thanks_from: {
      type: String,
      // required: [true],
    },
    against_bill_no: {
      type: Number,
      // required: [true],
    },
    vehicle_no: {
      type: Number,
    },
    cheque_no: {
      type: Number,
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
