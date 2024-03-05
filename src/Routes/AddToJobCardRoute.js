const express = require("express");
const router = express.Router();
const addToCard = require("../Controllers/AddToJobCardController");

router
  .route("/jobCard")
  .get(addToCard.getRecentAddToJobCard)
  .post(addToCard.createAddToJobCard);
router.route("/jobCard/recent").get(addToCard.getRecentPostAddToJobCard);

router
  .route("/jobCard/all")
  .get(addToCard.getAllAddToJobCard)
  .post(addToCard.filterCard);
router
  .route("/jobCard/:id")
  .get(addToCard.getPreviewJobCard)
  .post(addToCard.getCardWithCustomerId);
router.route("/jobCard/invoice/:job_no").get(addToCard.getPreviewJobNoCard);

router
  .route("/jobCard/one/:id")
  .get(addToCard.getSpecificCard)
  .put(addToCard.updateCard)
  .delete(addToCard.deleteJobCard);

module.exports = router;
