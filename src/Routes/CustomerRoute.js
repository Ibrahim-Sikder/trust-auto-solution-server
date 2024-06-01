const express = require("express");
const router = express.Router();
const customer = require("../Controllers/CustomerController");

router
  .route("/customer")
  .get(customer.getCustomerData)
  .post(customer.createCustomerDetails);
 

router
  .route("/customer/all")
  .post(customer.filterCard);
router.route("/customer/:id").get(customer.getCustomerProfile);
 
router
  .route("/customer/one/:id")
  .get(customer.getSpecificCard)
  .put(customer.updateCard)
  .delete(customer.deleteCustomer);

module.exports = router;
