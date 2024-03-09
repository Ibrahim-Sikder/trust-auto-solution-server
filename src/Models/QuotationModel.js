const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
    },
    companyId: {
      type: String,
    },
    showRoomId: {
      type: String,
    },
    username: {
      type: String || Number,
      // required: [true],
    },
    job_no: {
      type: Number,
    },
    date: {
      type: String,
      // required: [true ],
    },

    car_registration_no: {
      type: String,
      // required: [true ],
    },

    customer_name: {
      type: String,
      // required: [true ],
    },

    contact_number: {
      type: Number,
      // required: [true ],
    },
    mileage: {
      type: Number,
      // required: [true ],
    },
    serial_no: {
      type: Number,
      // required: [true ],
    },

    // descriptions: [
    //   {
    //     type: String,
    //     required: [true ],
    //   },
    // ],
    // quantity: [
    //   {
    //     type: Number,
    //     // required: [true ],
    //   },
    // ],
    // rate: [
    //   {
    //     type: Number,
    //     // required: [true ],
    //   },
    // ],
    // amount: [
    //   {
    //     type: Number,
    //     // required: [true ],
    //   },
    // ],
    input_data: [
      {
        description: { type: String, trim: true },
        quantity: Number,
        rate: Number,
        total: Number,
        // required: [true ],
      },
    ],
    total_amount: {
      type: Number,
      // required: [true ],
    },
    discount: {
      type: Number,
      // required: [true ],
    },
    vat: {
      type: Number,
      // required: [true ],
    },
    net_total: {
      type: Number,
      // required: [true ],
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;
