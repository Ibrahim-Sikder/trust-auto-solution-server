const express = require("express");
const router = express.Router();
const supplier = require("../Controllers/SupplierController");

router
  .route("/supplier")
  .get(supplier.getAllSupplier)
  .post(supplier.createSupplier);

router
  .route("/supplier/all")

  .post(supplier.filterCard);

router
  .route("/supplier/one/:id")
  .delete(supplier.deleteSupplier)
  .get(supplier.getSpecificSupplier)
  .put(supplier.updateSupplier);

module.exports = router;
