const mongoose = require("mongoose");

const moneyReceiptSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
    },
    job_no: {
      type: Number,
    },
    default_date: {
      type: String,
    },
    advance_select: {
      type: Boolean,
    },
    final_payment: {
      type: Boolean,
    },
    cash: {
      type: Boolean,
    },
    cheque: {
      type: Boolean,
    },

    thanks_from: {
      type: String,
       
    },
    against_bill_no: {
      type: String,
      
    },
    vehicle_no: {
      type: String,
    },
    cheque_no: {
      type: String,
       
    },

    date_one: {
      type: String,
       
    },

    bank: {
      type: String,
      
    },

    date_two: {
      type: String,
       
    },
    total_amount: {
      type: Number,
       
    },
    advance: {
      type: Number,
       
    },
    remaining: {
      type: Number,
       
    },

    taka_in_word: {
      type: String,
       
    },
  },
  {
    timestamps: true,
  }
);

const MoneyReceipt = mongoose.model("MoneyReceipt", moneyReceiptSchema);

module.exports = MoneyReceipt;
