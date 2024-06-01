const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true,
      required: [true, "Customer Id is required."],
    },

    user_type: {
      type: String,
      default: "customer",
      required: true,
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
    customer_country_code: {
      type: String,
    },
    customer_contact: {
      type: String,
    },
    fullCustomerNum: {
      type: String,
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
    driver_country_code: {
      type: String,
    },
    driver_contact: {
      type: String,
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
      type: String  
      // required: [true, "Car registration number is required."],
    },
    fullRegNum: {
      type: String,
    },
    chassis_no: {
      type: String  
      // required: [true, "Chassis number is required."],
    },
    engine_no: {
      type: String 
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
      type: String  
      // required: [true, "Color is required."],
    },
  },
  {
    timestamps: true,
    
  }
);

// Pre-save middleware to concatenate carReg_no and car_registration_no
customerSchema.pre("save", function (next) {
  if (this.carReg_no && this.car_registration_no) {
    this.fullRegNum = `${this.carReg_no} ${this.car_registration_no}`;
  } else {
    this.fullRegNum = "";
  }
  next();
});

customerSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.carReg_no && update.$set.car_registration_no) {
    update.$set.fullRegNum = `${update.$set.carReg_no} ${update.$set.car_registration_no}`;
  } else if (update.carReg_no && update.car_registration_no) {
    update.fullRegNum = `${update.carReg_no} ${update.car_registration_no}`;
  }

  next();
});

// Pre-save middleware to concatenate company_country_code and company_contact
customerSchema.pre("save", function (next) {
  if (this.customer_country_code && this.customer_contact) {
    this.fullCustomerNum = `${this.customer_country_code}${this.customer_contact}`;
  } else {
    this.fullCustomerNum = "";
  }
  next();
});

customerSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();

  if (
    update.$set &&
    update.$set.customer_country_code &&
    update.$set.customer_contact
  ) {
    update.$set.fullCustomerNum = `${update.$set.customer_country_code}${update.$set.customer_contact}`;
  } else if (update.customer_country_code && update.customer_contact) {
    update.fullCustomerNum = `${update.customer_country_code}${update.customer_contact}`;
  }

  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
