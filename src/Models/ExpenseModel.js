const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    sub_category: {
      type: String,
      // required: [true],
    },
    expense_for: {
      type: String,
      // required: [true],
    },
    tax_application: {
      type: String,
    },
    individual_markup_first: {
      type: String,
      // required: [true ],
    },
    expense_note_first: {
      type: String,
    },
    individual_markup_second: {
      type: String,
      // required: [true ],
    },
    expense_note_second: {
      type: String,
    },
    amount: {
      type: Number,
      // required: [true, "Company name is required."],
    },

    paid_on: {
      type: String,
      // required: [true, "Customer name is required."],
    },
    payment_individual_markup: {
      type: String,
      // required: [true, "Customer contact is required."],
    },
    payment_account_first: {
      type: String,
      // required: [true, "Customer address is required."],
    },
    payment_account_second: {
      type: String,
      // required: [true, "Customer address is required."],
    },

    check_no: {
      type: Number,
      // required: [true ],
    },
    check_expense_note: {
      type: String,
      // required: [true ],
    },
    bank_account_no: {
      type: Number,
      // required: [true ],
    },
    bank_expense_note: {
      type: String,
      // required: [true ],
    },
    cash_expense_note: {
      type: String,
      // required: [true ],
    },
    card_number: {
      type: Number,
      // required: [true ],
    },
    card_holder_name: {
      type: String,
      // required: [true ],
    },
    card_transaction_no: {
      type: String,
      // required: [true ],
    },
    card_type: {
      type: String,
      // required: [true ],
    },
    month_first: {
      type: String,
      // required: [true ],
    },
    year: {
      type: String,
      // required: [true ],
    },
    month_second: {
      type: String,
      // required: [true ],
    },
    security_code: {
      type: Number,
      // required: [true ],
    },
    card_expense_note: {
      type: String,
      // required: [true ],
    },
    other_transaction_no: {
      type: String,
      // required: [true ],
    },
    other_expense_note: {
      type: String,
      // required: [true ],
    },

    image: {
      type: String,
    },

    
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
