const mongoose = require("mongoose");

const addToJobCardSchema = new mongoose.Schema(
  {
    username: {
      type: String || Number,
      required: [true, "Username is required."],
    },
    job_no: {
      type: Number,
      default: 101,
      required: [true, "Job number is required."],
    },
    date: {
      type: String,
      required: [true, "Date is required."],
    },
    chassis_no: {
      type: Number || String,
      required: [true, "Chassis number is required."],
    },
    car_registration_no: {
      type: String || Number,
      // required: [true, "Car registration number is required."],
    },
    vehicle_model: {
      type: Number,
      required: [true, "Vehicle model is required."],
    },
    vehicle_brand: {
      type: String || Number,
      required: [true, "Vehicle brand is required."],
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required."],
    },
    color: {
      type: String || Number,
      required: [true, "Color is required."],
    },
    engine_no: {
      type: String || Number,
      required: [true, "Engine number is required."],
    },
    referenc_name: {
      type: String,
    },
    company_name: {
      type: String,
    },
    vehicle_category: {
      type: String,
      required:[true, "Vehicle category is required."]
    },
    customer_name: {
      type: String,
    },
    contact_number: {
      type: Number,
    },
    driver_name: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    vehicle_interior_parts: {
      type: String,
    },
    reported_defect: {
      type: String,
    },
    reported_action: {
      type: String,
    },
    vehicle_body_report: {
      type: String,
    },
    technician_name: {
      type: String,
    },
    technician_signature: {
      type: String,
      required: [true, "Technician signature is required."],
    },
    technician_date: {
      type: String,
      required: [true, "Technician date is required."],
    },
    vehicle_owner: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AddToJobCard = mongoose.model("AddToJobCard", addToJobCardSchema);

module.exports = AddToJobCard;
