const express = require("express");
const router = express.Router();
const customer = require("../Controllers/CustomerController");

router
  .route("/customer")
  .get(customer.getCustomerData)
  .post(customer.createCustomerDetails);
// router
//   .route("/jobCard/recent")
//   .get(addToCard.getRecentPostAddToJobCard)
   

router
  .route("/customer/all")
  // .get(addToCard.getAllAddToJobCard)
  .post(customer.filterCard);
router.route("/customer/:id").get(customer.getCustomerProfile);
// router.route("/jobCard/invoice/:job_no").get(addToCard.getPreviewJobNoCard);

router
  .route("/customer/one/:id")
  .get(customer.getSpecificCard)
  .put(customer.updateCard)
  .delete(customer.deleteCustomer);

module.exports = router;
