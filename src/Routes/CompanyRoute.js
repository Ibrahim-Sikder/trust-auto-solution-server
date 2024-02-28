const express = require("express");
const router = express.Router();
const company = require("../Controllers/CompanyController");

router
  .route("/company")
  .get(company.getCompanyData)
  .post(company.createCompanyDetails);
// router
//   .route("/jobCard/recent")
//   .get(addToCard.getRecentPostAddToJobCard)
   

router
  .route("/company/all")
  // .get(addToCard.getAllAddToJobCard)
  .post(company.filterCard);
router.route("/company/:id").get(company.getCompanyProfile);
// router.route("/jobCard/invoice/:job_no").get(addToCard.getPreviewJobNoCard);

router
  .route("/company/one/:id")
  .get(company.getSpecificCard)
  .put(company.updateCard)
  .delete(company.deleteCompany);

module.exports = router;
