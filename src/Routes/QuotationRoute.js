const express = require("express");
const router = express.Router();
const quotation = require("../Controllers/QuotationController");

router
  .route("/quotation")
  .get(quotation.getRecentQuotation)
  .post(quotation.createQuotationCard);

router
  .route("/quotation/all")
  .get(quotation.getAllQuotation)
  .post(quotation.filterCard);
router
  .route("/quotation/:id")
  .get(quotation.getPreviewQuotation)
  .put(quotation.updateByIndex);

router
  .route("/quotation/one/:id")
  .get(quotation.getSpecificCard)
  .put(quotation.updateQuotation)
  .delete(quotation.deleteQuotation);

module.exports = router;
