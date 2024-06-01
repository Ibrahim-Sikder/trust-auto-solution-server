const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      unique: true,
      required: [true, "Company Id is required."],
    },

    user_type: {
      type: String,
      default: "company",
      required: true,
    },
    // Customer Information

    company_name: {
      type: String,
    },
    username: {
      type: String,
    },
    company_address: {
      type: String,
    },
    company_country_code: {
      type: String,
    },
    company_contact: {
      type: String,
    },
    fullCompanyNum: {
      type: String,
    },
    company_email: {
      type: String,
    },

    driver_name: {
      type: String,
    },
    driver_country_code: {
      type: String,
    },
    driver_contact: {
      type: String,
    },
    reference_name: {
      type: String,
    },

    // Vehicle Information

    carReg_no: {
      type: String,
    },
    car_registration_no: {
      type: String,
    },
    fullRegNum: {
      type: String,
    },
    chassis_no: {
      type: String,
    },
    engine_no: {
      type: String,
    },

    vehicle_brand: {
      type: String,
    },
    vehicle_name: {
      type: String,
    },
    vehicle_model: {
      type: Number,
    },
    vehicle_category: {
      type: String,
    },
    color_code: {
      type: String,
    },
    mileage: {
      type: Number,
    },
    fuel_type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to concatenate carReg_no and car_registration_no
companySchema.pre("save", function (next) {
  if (this.carReg_no && this.car_registration_no) {
    this.fullRegNum = `${this.carReg_no} ${this.car_registration_no}`;
  } else {
    this.fullRegNum = "";
  }
  next();
});

companySchema.pre("updateOne", function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.carReg_no && update.$set.car_registration_no) {
    update.$set.fullRegNum = `${update.$set.carReg_no} ${update.$set.car_registration_no}`;
  } else if (update.carReg_no && update.car_registration_no) {
    update.fullRegNum = `${update.carReg_no} ${update.car_registration_no}`;
  }

  next();
});

// Pre-save middleware to concatenate company_country_code and company_contact
companySchema.pre("save", function (next) {
  if (this.company_country_code && this.company_contact) {
    this.fullCompanyNum = `${this.company_country_code}${this.company_contact}`;
  } else {
    this.fullCompanyNum = "";
  }
  next();
});

companySchema.pre("updateOne", function (next) {
  const update = this.getUpdate();

  if (
    update.$set &&
    update.$set.company_country_code &&
    update.$set.company_contact
  ) {
    update.$set.fullCompanyNum = `${update.$set.company_country_code}${update.$set.company_contact}`;
  } else if (update.company_country_code && update.company_contact) {
    update.fullCompanyNum = `${update.company_country_code}${update.company_contact}`;
  }

  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
