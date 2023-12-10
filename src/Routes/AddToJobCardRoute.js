const express = require("express");
const router = express.Router();
const addToCard = require("../Controllers/AddToJobCardController");

router
  .route("/jobCard")
  .get(addToCard.getRecentAddToJobCard)
  .post(addToCard.createAddToJobCard);

router
  .route("/jobCard/all/:username")
  .get(addToCard.getAllAddToJobCard)
  .post(addToCard.filterCard);
router.route("/jobCard/:job_no").get(addToCard.getPreviewJobCard);

router
  .route("/jobCard/one/:id")
  .get(addToCard.getSpecificCard)
  .put(addToCard.updateCard)
  .delete(addToCard.deleteJobCard);

module.exports = router;
