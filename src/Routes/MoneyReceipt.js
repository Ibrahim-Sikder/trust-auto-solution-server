const express = require("express");
const router = express.Router();
const moneyReceipt = require("../Controllers/MoneyReceipt");

router
  .route("/money_receipt")
  .get(moneyReceipt.getMoneyReceipt)
  .post(moneyReceipt.createMoneyReceipt);

router
  .route("/money_receipt/all")
  .post(moneyReceipt.filterCard);
 

router
  .route("/money_receipt/:id")
  .delete(moneyReceipt.deleteMoneyReceipt)
  .get(moneyReceipt.getSpecificMoneyReceipt)
  .put(moneyReceipt.updateMoneyReceipt)

module.exports = router;
