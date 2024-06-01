const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
     Id: {
      type: String,
      // required: [true, "Username is required."],
    },
    // companyId: {
    //   type: String,
    // },
    // showRoomId: {
    //   type: String,
    // },

    // Vehicle Information

    carReg_no: {
      type: String,
      // required: [true, "Car Reg number is required."],
    },
    car_registration_no: {
      type: String  ,
      // required: [true, "Car registration number is required."],
    },
    fullRegNum: {
      type: String,
    },
    chassis_no: {
      type: String  ,
      // required: [true, "Chassis number is required."],
    },
    engine_no: {
      type: String,
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




// Pre-save middleware to concatenate carReg_no and car_registration_no
vehicleSchema.pre("save", function (next) {
  if (this.carReg_no && this.car_registration_no) {
    this.fullRegNum = `${this.carReg_no} ${this.car_registration_no}`;
  } else {
    this.fullRegNum = "";
  }
  next();
});

vehicleSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.carReg_no && update.$set.car_registration_no) {
    update.$set.fullRegNum = `${update.$set.carReg_no} ${update.$set.car_registration_no}`;
  } else if (update.carReg_no && update.car_registration_no) {
    update.fullRegNum = `${update.carReg_no} ${update.car_registration_no}`;
  }

  next();
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
