const express = require("express");
const router = express.Router();
const employee = require("../Controllers/EmployeeController");

router
  .route("/employee")
  .get(employee.getAllEmployee)
  .post(employee.createEmployee);
//   .get(employee.getRecentEmployee)

router
  .route("/employee/all")
  // .put(employee.updateEmployee)
  .post(employee.filterCard);

router
  .route("/employee/one/:id")
  .get(employee.getSpecificEmployee)
  .delete(employee.deleteEmployee)
  .put(employee.updateEmployee);

module.exports = router;
