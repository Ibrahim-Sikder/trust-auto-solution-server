const Invoice = require("../Models/InvoiceModel");

exports.createInvoiceCard = async (req, res) => {
  try {
    const existingInvoice = await Invoice.findOne({
      job_no: req.body.job_no,
    });

    if (existingInvoice) {
      return res.status(400).json({
        message: "Order no already exists.",
      });
    }
    const InvoicePost = new Invoice(req.body);

    const result = await InvoicePost.save();
   
    res.status(200).json({
      message: "Successfully Invoice post",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getPreviewInvoice = async (req, res) => {
  try {
    const job_no = req.params.job_no;
    console.log(job_no);
    const invoice = await Invoice.findOne({ job_no });
   console.log(invoice)
    // if (Invoice.length === 0) {
    //   return res.json({
    //     message: "No Invoice card found.",
    //   });
    // }

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllInvoice = async (req, res) => {
  try {
    const username = req.params.username;
    const allInvoice = await Invoice.find({ username }).sort({
      createdAt: -1,
    });
    if (allInvoice.length === 0) {
      return res.json({
        message: "No Invoice card found.",
      });
    }
    res.json(allInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filterCard = async (req, res) => {
  try {
    const username = req.params.username;
    const { select, filterType } = req.body;
    console.log(req.body);
    if (username !== username) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    let query = {};

    if (select === "Customer Name") {
      query.customer_name = { $regex: new RegExp(filterType, "i") };
    }
    if (select === "Order Number") {
      const numericFilterType = parseInt(filterType, 10);

      if (!isNaN(numericFilterType)) {
        query.job_no = numericFilterType;
      } else {
        return res.status(400).json({ error: "Invalid filterType for SL No" });
      }
    }
    if (select === "Car Number") {
      query.car_registration_no = { $regex: new RegExp(filterType, "i") };
    }
    if (select === "Mobile Number") {
      const numericFilterType = parseInt(filterType,10);

      if (!isNaN(numericFilterType)) {
        query.phone_number = numericFilterType;
      } else {
        return res
          .status(400)
          .json({ error: "Invalid filterType for this phone number" });
      }
    }

    // Perform the MongoDB query with the constructed filter
    const result = await Invoice.find(query);
    if (!result || result.length === 0) {
      // Send a success message with an empty result array
      return res.status(200).json({ message: "No matching found", result: [] });
    }
    // Send the result as JSON response
    console.log(result)
    res.json({message:"Filter successful",result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.deleteOne({ _id: id });
    res.status(200).json({ message: "Invoice card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
