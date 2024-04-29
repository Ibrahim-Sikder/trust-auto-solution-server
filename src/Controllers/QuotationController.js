const Quotation = require("../Models/QuotationModel");

exports.getRecentQuotation = async (req, res) => {
  try {
    const recentQuotation = await Quotation.find({})
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentQuotation.length === 0) {
      return res.json({
        message: "No recent job card found.",
      });
    }

    res.json(recentQuotation[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createQuotationCard = async (req, res) => {
  try {
    const quotationPost = new Quotation(req.body);
 
    const result = await quotationPost.save();
 
    res.status(200).json({
      message: "Successfully quotation post",
      result,
    });
  } catch (error) {
    
    res.send("Internal server error");
  }
};

exports.getPreviewQuotation = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(job_no);
    const quotation = await Quotation.findOne({ _id: id });

    

    res.status(200).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getCardWithCustomerId = async (req, res) => {
  try {
    const id = req.params.id;
    const jobCard = await Quotation.find({ Id :id});


    if (jobCard.length === 0) {
      return res.json({
        message: "No job card found.",
      });
    }

    res.status(200).json({
      message: "success",
      jobCard
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllQuotation = async (req, res) => {
  try {
    // const username = req.params.username;
    const allQuotation = await Quotation.find({}).sort({
      createdAt: -1,
    });
    if (allQuotation.length === 0) {
      return res.json({
        message: "No quotation card found.",
      });
    }
    res.json(allQuotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.filterCard = async (req, res) => {
//   try {
//     const username = req.params.username;
//     const { select, filterType } = req.body;
//     console.log(req.body);
//     if (username !== username) {
//       return res.status(403).json({ error: "Unauthorized" });
//     }

//     let query = {};

//     if (select === "Customer Name") {
//       query.customer_name = { $regex: new RegExp(filterType, "i") };
//     }
//     if (select === "Order Number") {
//       const numericFilterType = parseInt(filterType, 10);

//       if (!isNaN(numericFilterType)) {
//         query.job_no = numericFilterType;
//       } else {
//         return res.status(400).json({ error: "Invalid filterType for SL No" });
//       }
//     }
//     if (select === "Car Number") {
//       query.car_registration_no = { $regex: new RegExp(filterType, "i") };
//     }
//     if (select === "Mobile Number") {
//       const numericFilterType = parseInt(filterType, 10);

//       if (!isNaN(numericFilterType)) {
//         query.phone_number = numericFilterType;
//       } else {
//         return res
//           .status(400)
//           .json({ error: "Invalid filterType for this phone number" });
//       }
//     }

//     // Perform the MongoDB query with the constructed filter
//     const result = await Quotation.find(query);
//     if (!result || result.length === 0) {
//       // Send a success message with an empty result array
//       return res.status(200).json({ message: "No matching found", result: [] });
//     }
//     // Send the result as JSON response
//     console.log(result);
//     res.json({ message: "Filter successful", result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;

    const isNumeric = !isNaN(Number(filterType));

    let quotation;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      quotation = await Quotation.find({
        $or: [
          { customer_name: { $regex: filterType, $options: "i" } },
          { date: { $regex: filterType, $options: "i" } },
          { car_registration_no: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      quotation = await Quotation.find({
        $or: [
          { job_no: filterType },
          { contact_number: filterType },
        ].filter(Boolean),
      });
    }

    if (!quotation || quotation.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: quotation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};







exports.deleteQuotation = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation = await Quotation.deleteOne({ _id: id });
    res.status(200).json({ message: "Quotation card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation = await Quotation.findOne({ _id: id });
    res.status(200).json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateQuotation = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Quotation.updateMany(
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

exports.updateByIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const { index } = req.body;
    const getQuotation = await Quotation.findOne({ _id: id });
    const updateQuotation = await Quotation.updateOne(
      { _id: id },
      { $pull: { input_data: { $eq: getQuotation.input_data[index] } } },
      { runValidators: true }
    );
 
    res.status(200).json({ message: "Deleted successful" });
  } catch (error) {
   
    res.status(500).json({ error: "Internal server error" });
  }
};

 
