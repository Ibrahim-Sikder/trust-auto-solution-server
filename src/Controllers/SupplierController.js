const Supplier = require("../Models/SupplierModel");

// exports.getRecentInvoiceCard = async (req, res) => {
//   try {
//     const recentInvoice = await Invoice.find({})
//       .sort({ createdAt: -1 })
//       .limit(1);

//     if (recentInvoice.length === 0) {
//       return res.json({
//         message: "No recent job card found.",
//       });
//     }

//     res.json(recentInvoice[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.createSupplier = async (req, res) => {
  try {
    const supplierPost = new Supplier(req.body);

    const result = await supplierPost.save();

    res.status(200).json({
      message: "Successfully supplier post",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.getAllSupplier = async (req, res) => {
  try {
    // const username = req.params.username;
    const allSupplier = await Supplier.find({}).sort({
      createdAt: -1,
    });
    if (allSupplier.length === 0) {
      return res.json({
        message: "No supplier found.",
      });
    }
    res.status(200).json({
      message: "success",
      allSupplier,
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
      supplier = await Supplier.find({
        $or: [
          { full_name: { $regex: filterType, $options: "i" } },
          { email: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      supplier = await Supplier.find({
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
exports.deleteSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await Supplier.deleteOne({ _id: id });
    res.status(200).json({ message: "Supplier card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSpecificSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await Supplier.findOne({ _id: id });
    res.status(200).json({
        message:"success",
        supplier
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Supplier.updateMany(
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
