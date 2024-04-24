const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    Id: {
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
    company_name: {
      type: String,
      // required: [true, "Company name is required."],
    },

    customer_name: {
      type: String,
      // required: [true, "Customer name is required."],
    },
    customer_contact: {
      type: Number,
      // required: [true, "Customer contact is required."],
      min: [11, "Phone number must be 11 character!"],
    },
    customer_address: {
      type: String,
      // required: [true, "Customer address is required."],
    },

    car_registration_no: {
      type: String,
      // required: [true ],
    },

    chassis_no: {
      type: String || Number,
      // required: [true, "Chassis number is required."],
    },
    engine_no: {
      type: String || Number,
      // required: [true, "Chassis number is required."],
    },

    vehicle_name: {
      type: String,
      // required: [true, "Vehicle name is required."],
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
    //     // required: [true ],
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
        description: String,
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
    advance: {
      type: Number,
    },
    due: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
