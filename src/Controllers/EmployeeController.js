const Employee = require("../Models/EmployeeModel");

// exports.getRecentEmployee = async (req, res) => {
//   try {
//     const recentEmployee = await Employee.find({})
//       .sort({ createdAt: -1 })
//       .limit(1);

//     if (recentEmployee.length === 0) {
//       return res.json({
//         message: "No recent employee found.",
//       });
//     }

//     res.json(recentEmployee[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
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
// exports.getPreviewInvoice = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log(id);
//     const invoice = await Invoice.findOne({ _id: id });
//     console.log(invoice);

//     res.status(200).json(invoice);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getCardWithCustomerId = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const jobCard = await Invoice.find({
//       $or: [{ customerId: id }, { companyId: id }],
//     });

//     if (jobCard.length === 0) {
//       return res.json({
//         message: "No job card found.",
//       });
//     }

//     res.status(200).json({
//       message: "success",
//       jobCard,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;

    const isNumeric = !isNaN(Number(filterType));

    let supplier;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      supplier = await Employee.find({
        $or: [
          { full_name: { $regex: filterType, $options: "i" } },
          { email: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      supplier = await Employee.find({
        $or: [{ job_no: filterType }, { phone_number: filterType }].filter(
          Boolean
        ),
      });
    }

    if (!supplier || supplier.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: supplier });
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
