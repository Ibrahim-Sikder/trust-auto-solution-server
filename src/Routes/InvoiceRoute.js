const express = require("express");
const router = express.Router();
const invoice = require("../Controllers/InvoiceController");

router
  .route("/invoice")
//   .get(addToCard.getRecentAddToJobCard)
  .post(invoice.createInvoiceCard);

router
  .route("/invoice/all/:username")
  .get(invoice.getAllInvoice)
  .post(invoice.filterCard);
router.route("/invoice/:job_no").get(invoice.getPreviewInvoice);

router
  .route("/invoice/one/:id")
  .delete(invoice.deleteInvoice);
  // .get(addToCard.getSpecificCard)
  // .put(addToCard.updateCard)

module.exports = router;
