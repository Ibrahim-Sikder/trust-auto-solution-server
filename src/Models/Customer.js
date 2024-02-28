const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const CustomerList = mongoose.model("CustomerList", customerSchema);

module.exports = CustomerList;
