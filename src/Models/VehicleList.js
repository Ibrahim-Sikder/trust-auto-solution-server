const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      // required: [true, "Username is required."],
    },
    companyId: {
      type: String,
    },
    showRoomId: {
      type: String,
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

const VehicleList = mongoose.model("VehicleList", vehicleSchema);

module.exports = VehicleList;
