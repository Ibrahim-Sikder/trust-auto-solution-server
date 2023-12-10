const express = require("express");
const router = express.Router();
const quotation = require("../Controllers/QuotationController");

router
  .route("/quotation")
//   .get(addToCard.getRecentAddToJobCard)
  .post(quotation.createQuotationCard);

router
  .route("/quotation/all/:username")
  .get(quotation.getAllQuotation)
  .post(quotation.filterCard);
router.route("/quotation/:job_no").get(quotation.getPreviewQuotation);

router
  .route("/quotation/one/:id")
  .delete(quotation.deleteQuotation);
  // .get(addToCard.getSpecificCard)
  // .put(addToCard.updateCard)

module.exports = router;
