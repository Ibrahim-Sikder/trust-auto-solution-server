const express = require("express");
const router = express.Router();
const expense = require("../Controllers/ExpenseController");

router
  .route("/expense")
  .get(expense.getAllExpense)
  .post(expense.createExpense);
//   .get(employee.getRecentEmployee)

router
  .route("/expense/all")
  // .put(employee.updateEmployee)
  .post(expense.filterCard);

router
  .route("/expense/one/:id")
  .get(expense.getSpecificExpense)
  .delete(expense.deleteExpense)
  .put(expense.updateEmployee);

module.exports = router;
