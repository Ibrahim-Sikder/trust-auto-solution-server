const Employee = require("../Models/EmployeeModel");

exports.createEmployee = async (req, res) => {
  try {
    const employeePost = new Employee(req.body);

    const result = await employeePost.save();

    res.status(200).json({
      message: "Successfully employee post",
      result,
    });
  } catch (error) {
    res.send("Internal server error");
  }
};
exports.getAllEmployee = async (req, res) => {
  try {
    const employee = await Employee.find({}).sort({
      createdAt: -1,
    });
    if (employee.length === 0) {
      return res.json({
        message: "No employee found.",
      });
    }
    res.status(200).json({
      message: "success",
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.updateEmployee = async (req, res) => {
//   const { id } = req.params;
//   const attendanceData = req.body;

//   try {
//     // Check if the employee with the given _id exists
//     const employee = await Employee.findById(id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Ensure attendanceData is an array
//     if (!Array.isArray(attendanceData)) {
//       attendanceData = [attendanceData];
//     }

//     // Filter out the attendance data that matches the employee's _id
//     const filteredAttendanceData = attendanceData.filter(
//       data => data._id === id
//     );

//     // Update the employee document with the filtered attendance data
//     const updatedEmployee = await Employee.updateOne(
//       { _id: id }, // Match the employee ID
//       { $addToSet: { attendance: { $each: filteredAttendanceData } } }, // Push each attendance record in filteredAttendanceData to the matching attendance array
//       { new: true }
//     );

//     console.log("updatedEmployee", updatedEmployee);
//     res.json(updatedEmployee);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: error.message });
//   }
// };

// find korle object pawya jay
// filter korle array

exports.updateEmployeeAttendance = async (req, res) => {
  const attendanceData = req.body;

  try {
    const attendanceIds = attendanceData.map((entry) => entry._id);

    attendanceIds.forEach(async (id) => {
      const data = attendanceData.find((d) => d._id === id);

      const checkExist = await Employee.findOne({
        _id: id,
        "attendance.date": data.date,
      });

      if (checkExist) {
        const updateEmployee = await Employee.updateOne(
          { _id: id, "attendance.date": data.date },
          { $set: { "attendance.$": data } },
          { runValidators: true }
        );
      } else {
        const updateEmployee = await Employee.updateOne(
          { _id: id },
          { $push: { attendance: data } },
          { runValidators: true }
        );
      }

      if (checkExist && data.deleted === "delete") {
        const updateEmployee = await Employee.updateOne(
          { _id: id, "attendance.date": data.date },
          { $pull: { attendance: data } },
          { runValidators: true }
        );
      }

      if (data.salary === "salary") {
        const checkExist = await Employee.findOne({
          _id: id,
          "salary_details.month_of_salary": data.month_of_salary,
        });

        if (checkExist) {
          const updateEmployee = await Employee.updateOne(
            { _id: id, "salary_details.month_of_salary": data.month_of_salary },
            { $set: { "salary_details.$": data } },
            { runValidators: true }
          );
        } else {
          const updateEmployee = await Employee.updateOne(
            { _id: id },
            { $push: { salary_details: data } },
            { runValidators: true }
          );
        }
      }
    });
    res.status(200).json({ message: "Attendance data added successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;

    const isNumeric = !isNaN(Number(filterType));

    let employee;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      employee = await Employee.find({
        $or: [
          { employeeId: { $regex: filterType, $options: "i" } },
          { full_name: { $regex: filterType, $options: "i" } },
          { designation: { $regex: filterType, $options: "i" } },
          { email: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      employee = await Employee.find({
        $or: [{ phone_number: filterType }].filter(Boolean),
      });
    }

    if (!employee || employee.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//
exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.deleteOne({ _id: id });
    res.status(200).json({ message: "Employee delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSpecificEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findOne({ _id: id });
    res.status(200).json({
      message: "success",
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Employee.updateMany(
      { _id: id },
      {
        $set: updateCard,
      },
      { runValidators: true }
    );
    res.status(200).json({
      message: "Successfully update card.",
    });
  } catch (error) {
    res.send("Internal server error");
  }
};
