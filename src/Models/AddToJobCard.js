const mongoose = require("mongoose");

const addToJobCardSchema = new mongoose.Schema(
  {
    
   Id: {
      type: String,
       
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
    // Customer Information

    company_name: {
      type: String,
      // required: [true, "Company name is required."],
    },
    username: {
      type: String,
      // required: [true, "Username is required."],
    },
    company_address: {
      type: String,
      // required: [true, "Company address is required."],
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
    customer_email: {
      type: String,
      // required: [true, "Customer email is required."],
    },
    customer_address: {
      type: String,
      // required: [true, "Customer address is required."],
    },
    driver_name: {
      type: String,
      // required: [true, "Driver name is required."],
    },
    driver_contact: {
      type: Number,
      min: [11, "Phone number must be 11 character!"],
    },
    reference_name: {
      type: String,
      // required: [true, "Reference name is required."],
    },

    // Vehicle Information

    carReg_no: {
      type: String,
      // required: [true, "Car Reg number is required."],
    },
    car_registration_no: {
      type: String || Number,
      // required: [true, "Car registration number is required."],
    },
    chassis_no: {
      type: String || Number,
      // required: [true, "Chassis number is required."],
    },
    engine_no: {
      type: String || Number,
      // required: [true, "Chassis number is required."],
    },

    vehicle_brand: {
      type: String,
      // required: [true, "Vehicle brand is required."],
    },
    vehicle_name: {
      type: String,
      // required: [true, "Vehicle name is required."],
    },
    vehicle_model: {
      type: Number,
      // required: [true, "Vehicle model is required."],
    },
    vehicle_category: {
      type: String,
      // required: [true, "Vehicle category is required."],
    },
    color_code: {
      type: String,
      // required: [true, "Color code is required."],
    },
    mileage: {
      type: Number,
      // required: [true, "Mileage is required."],
    },
    fuel_type: {
      type: String || Number,
      // required: [true, "Color is required."],
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
    note: {
      type: String,
    },
    vehicle_body_report: {
      type: String,
    },
    technician_name: {
      type: String,
      // required: [true, "Technician name is required."],
    },
    technician_signature: {
      type: String,
      // required: [true, "Technician signature is required."],
    },
    technician_date: {
      type: String,
      // required: [true, "Technician date is required."],
    },
    vehicle_owner: {
      type: String,
      // required: [true, "vehicle_owner is required."],
    },
  },
  {
    timestamps: true,
  }
);

const AddToJobCard = mongoose.model("AddToJobCard", addToJobCardSchema);

module.exports = AddToJobCard;
