const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      // required: [true],
    },
    phone_number: {
      type: Number,
    },
    email: {
      type: String,
      // required: [true ],
    },
    vendor: {
      type: String,
      // required: [true, "Company name is required."],
    },

    shop_name: {
      type: String,
      // required: [true, "Customer name is required."],
    },
    country: {
      type: String,
      // required: [true, "Customer contact is required."],
    },
    city: {
      type: String,
      // required: [true, "Customer address is required."],
    },

    address: {
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

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
