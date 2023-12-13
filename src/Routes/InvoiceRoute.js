const express = require("express");
const router = express.Router();
const invoice = require("../Controllers/InvoiceController");

router
  .route("/invoice")
  .get(invoice.getRecentInvoiceCard)
  .post(invoice.createInvoiceCard);

router
  .route("/invoice/all")
  .get(invoice.getAllInvoice)
  .post(invoice.filterCard);
router.route("/invoice/:id").get(invoice.getPreviewInvoice);

router
  .route("/invoice/one/:id")
  .delete(invoice.deleteInvoice)
  .get(invoice.getSpecificInvoice)
  .put(invoice.updateInvoice)

module.exports = router;
