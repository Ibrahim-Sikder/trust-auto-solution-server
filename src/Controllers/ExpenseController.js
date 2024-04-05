const Expense = require("../Models/ExpenseModel");

exports.createExpense = async (req, res) => {
  try {
    const expensePost = new Expense(req.body);

    const result = await expensePost.save();

    res.status(200).json({
      message: "Successfully expense post",
      result,
    });
  } catch (error) {
    res.send("Internal server error");
  }
};

exports.getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.find({}).sort({
      createdAt: -1,
    });
    if (expense.length === 0) {
      return res.json({
        message: "No expense found.",
      });
    }
    res.status(200).json({
      message: "success",
      expense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;

    const isNumeric = !isNaN(Number(filterType));

    let expense;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      expense = await Expense.find({
        $or: [
          { category: { $regex: filterType, $options: "i" } },
          { sub_category: { $regex: filterType, $options: "i" } },
          { expense_for: { $regex: filterType, $options: "i" } },
          { payment_account_first: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      expense = await Expense.find({
        $or: [{ amount: filterType }].filter(Boolean),
      });
    }

    if (!expense || expense.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.deleteOne({ _id: id });
    res.status(200).json({ message: "Expense delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSpecificExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findOne({ _id: id });
    res.status(200).json({
      message: "success",
      expense,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Expense.updateMany(
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
