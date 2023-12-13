const mongoose = require("mongoose");

const addToJobCardSchema = new mongoose.Schema(
  {
    username: {
      type: String || Number,
      // required: [true],
    },
    job_no: {
      type: Number,
      default: 101,
      // required: [true ],
    },
    date: {
      type: String,
      // required: [true ],
    },
    vin_no: {
      type: Number,
      // required: [true ],
    },
    car_registration_no: {
      type: String || Number,
      // required: [true ],
    },
    car_model: {
      type: String || Number,
      // required: [true ],
    },
    car_make: {
      type: String || Number,
      // required: [true ],
    },
    mileage: {
      type: Number,
      // required: [true ],
    },
    color: {
      type: String,
      // required: [true ],
    },
    engine_no: {
      type: String || Number,
      // required: [true ],
    },
    reference_number: {
      type: String,
      // required: [true ],
    },
    company_name: {
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
    driver_name: {
      type: String,
      // required: [true ],
    },
    phone_number: {
      type: Number,
      // required: [true ],
    },
    vehicle_interior_parts: {
      type: String,
      // required: [true ],
    },
    reported_defect: {
      type: String,
      // required: [true ],
    },
    reported_action: {
      type: String,
      // required: [true ],
    },
    vehicle_body_report: {
      type: String,
      // required: [true ],
    },
    technician_name: {
      type: String,
      // required: [true ],
    },
    technician_signature: {
      type: String,
      // required: [true ],
    },
    technician_date: {
      type: String,
      // required: [true ],
    },
    vehicle_owner: {
      type: String,
      // required: [true ],
    },
  },
  {
    timestamps: true,
  }
);

const AddToJobCard = mongoose.model("AddToJobCard", addToJobCardSchema);

module.exports = AddToJobCard;
