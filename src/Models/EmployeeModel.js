const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
    },
    full_name: {
      type: String,
      // required: [true],
    },
    date_of_birth: {
      type: String,
      // required: [true],
    },
    nid_number: {
      type: Number,
    },
    blood_group: {
      type: String,
      // required: [true ],
    },
    phone_number: {
      type: Number,
    },
    email: {
      type: String,
      // required: [true ],
    },
    gender: {
      type: String,
    },
    join_date: {
      type: String,
      // required: [true, "Company name is required."],
    },

    designation: {
      type: String,
      // required: [true, "Customer name is required."],
    },
    status: {
      type: String,
      // required: [true, "Customer contact is required."],
    },
    password: {
      type: String,
      // required: [true, "Customer address is required."],
    },
    confirm_password: {
      type: String,
      // required: [true, "Customer address is required."],
    },

    father_name: {
      type: String,
      // required: [true ],
    },
    mother_name: {
      type: String,
      // required: [true ],
    },
    nationality: {
      type: String,
      // required: [true ],
    },
    religion: {
      type: String,
      // required: [true ],
    },
    country: {
      type: String,
      // required: [true ],
    },
    city: {
      type: String,
      // required: [true ],
    },
    address: {
      type: String,
      // required: [true ],
    },

    image: {
      type: String,
    },

    attendance: [
      {
        date: String,
        full_name: String,
        employeeId: String,
        status: String,
        designation: String,
        present: Boolean,
        absent: Boolean,
        in_time: String,
        out_time: String,
        overtime: Number,
        late_status: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
