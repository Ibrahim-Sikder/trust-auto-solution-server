const Customer = require("../Models/Customer");

exports.createCustomerDetails = async (req, res) => {
  try {
    const customerCreated = new Customer(req.body);
    const result = await customerCreated.save();
    res.status(200).json({
      message: "Successfully add to customer post",
      result,
    });
  } catch (error) {
   
    res.send("Internal server error");
  }
};



exports.getCustomerData = async (req, res) => {
  try {
    const allPost = await Customer.find({}).sort({
      createdAt: -1,
    });
    if (allPost.length === 0) {
      return res.json({
        message: "No card found.",
      });
    }
    res.json(allPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



 
exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;
     

    const isNumeric = !isNaN(Number(filterType));
    const filterValue = isNumeric ? Number(filterType) : filterType;

    let customer;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      customer = await Customer.find({
        $or: [
          { customer_name: { $regex: filterType, $options: "i" } },
          { date: { $regex: filterType, $options: "i" } },
          { car_registration_no: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      customer = await Customer.find({
        $or: [
          { job_no: filterValue },
          { customer_contact: filterValue },
        ],
      });
    }

    if (!customer || customer.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 

// exports.getRecentPostAddToJobCard = async (req, res) => {
//   try {
//     const recentPostJobCard = await Customer.find({})
//       .sort({ createdAt: -1 })
//       .limit(1);

//     if (recentPostJobCard.length === 0) {
//       return res.json({
//         message: "No recent job card found.",
//       });
//     }

//     res.json(recentPostJobCard[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// exports.getRecentAddToJobCard = async (req, res) => {
//   try {
//     const recentJobCard = await Customer.find({})
//       .sort({ job_no: -1 })
//       .limit(1);

//     if (recentJobCard.length === 0) {
//       return res.json({
//         message: "No recent job card found.",
//       });
//     }

//     res.json(recentJobCard[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getCustomerProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({ customerId: id });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.getPreviewJobNoCard = async (req, res) => {
//   try {
//     const job_no = req.params.job_no;
//     const jobCard = await Customer.findOne({job_no });
  
//     // if (jobCard.length === 0) {
//     //   return res.json({
//     //     message: "No job card found.",
//     //   });
//     // }

//     res.status(200).json(jobCard);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;
 
    const customer = await Customer.findOne({ _id: id });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Customer.updateMany(
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
exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.deleteOne({ _id: id });
    res.status(200).json({ message: "Customer card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
