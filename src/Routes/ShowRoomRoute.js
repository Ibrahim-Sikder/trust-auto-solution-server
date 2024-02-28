const express = require("express");
const router = express.Router();
const showRoom = require("../Controllers/ShowRoomController");

router
  .route("/showRoom")
  .get(showRoom.getShowRoom)
  .post(showRoom.createShowRoomDetails);
// router
//   .route("/jobCard/recent")
//   .get(addToCard.getRecentPostAddToJobCard)
   

router
  .route("/showRoom/all")
  // .get(addToCard.getAllAddToJobCard)
  .post(showRoom.filterCard);
router.route("/showRoom/:id").get(showRoom.getShowRoomProfile);
// router.route("/jobCard/invoice/:job_no").get(addToCard.getPreviewJobNoCard);

router
  .route("/showRoom/one/:id")
  .get(showRoom.getSpecificCard)
  .put(showRoom.updateCard)
  .delete(showRoom.deleteShowRoom);

module.exports = router;
