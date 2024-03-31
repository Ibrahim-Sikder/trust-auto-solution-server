const MoneyReceipt = require("../Models/MoneyReceipt");

exports.getMoneyReceipt = async (req, res) => {
  try {
    const moneyReceipt = await MoneyReceipt.find({}).sort({ createdAt: -1 });

    if (moneyReceipt.length === 0) {
      return res.json({
        message: "No money receipt card found.",
      });
    }
    res.status(200).json({
      message: "Successfully gets money receipt information.",
      moneyReceipt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.createMoneyReceipt = async (req, res) => {
  try {
    const moneyReceipt = new MoneyReceipt(req.body);

    const result = await moneyReceipt.save();

    res.status(200).json({
      message: "Successfully added money receipt information.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

// exports.getPreviewInvoice = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log(id);
//     const invoice = await Invoice.findOne({ _id: id });
//     console.log(invoice);
//     // if (Invoice.length === 0) {
//     //   return res.json({
//     //     message: "No Invoice card found.",
//     //   });
//     // }

//     res.status(200).json(invoice);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// exports.getAllInvoice = async (req, res) => {
//   try {
//     // const username = req.params.username;
//     const allInvoice = await Invoice.find({}).sort({
//       createdAt: -1,
//     });
//     if (allInvoice.length === 0) {
//       return res.json({
//         message: "No Invoice card found.",
//       });
//     }
//     res.json(allInvoice);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
 
exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;

    const isNumeric = !isNaN(Number(filterType));

    let moneyReceipt;

    if (!isNumeric) {
      moneyReceipt = await MoneyReceipt.find({
        $or: [
          { thanks_from: { $regex: filterType, $options: "i" } },
          { date_one: { $regex: filterType, $options: "i" } },
          { bank: { $regex: filterType, $options: "i" } },
          { date_two: { $regex: filterType, $options: "i" } },
          { taka_in_word: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      moneyReceipt = await MoneyReceipt.find({
        $or: [
          { against_bill_no: filterType },
          { vehicle_no: filterType },
          { cheque_no: filterType },
          { total_amount: filterType },
          { advance: filterType },
          { remaining: filterType },
        ].filter(Boolean),
      });
    }

    if (!moneyReceipt || moneyReceipt.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: moneyReceipt });
  } catch (error) {
   
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.deleteMoneyReceipt = async (req, res) => {
  try {
    const id = req.params.id;
    const moneyReceipt = await MoneyReceipt.deleteOne({ _id: id });
    res.status(200).json({ message: "MoneyReceipt delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSpecificMoneyReceipt = async (req, res) => {
  try {
    const id = req.params.id;
    const moneyReceipt = await MoneyReceipt.findOne({ _id: id });
    res.status(200).json(moneyReceipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCardWithCustomerId = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await MoneyReceipt.find({ $or: [{ customerId: id }, { companyId: id }] });


    if (card.length === 0) {
      return res.json({
        message: "No job card found.",
      });
    }

    res.status(200).json({
      message: "success",
      card
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateMoneyReceipt = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await MoneyReceipt.updateMany(
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
    console.log(error);
    res.send("Internal server error");
  }
};
