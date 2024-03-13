const express = require("express");
const router = express.Router();
const vehicle = require("../Controllers/VehicleListController");

router
  .route("/vehicle")
  .get(vehicle.getVehicleData)
  .post(vehicle.createVehicleDetails);
 
   

router
  .route("/vehicle/all")
  .post(vehicle.filterCard);
router.route("/vehicle/:id").get(vehicle.getVehicleProfile);

router
  .route("/vehicle/one/:id")
  .get(vehicle.getSpecificCard)
  .put(vehicle.updateCard)
  .delete(vehicle.deleteCustomer);

module.exports = router;
