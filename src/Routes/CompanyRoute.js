const express = require("express");
const router = express.Router();
const company = require("../Controllers/CompanyController");

router
  .route("/company")
  .get(company.getCompanyData)
  .post(company.createCompanyDetails);
 
   

router
  .route("/company/all")
 
  .post(company.filterCard);
router.route("/company/:id").get(company.getCompanyProfile);
 

router
  .route("/company/one/:id")
  .get(company.getSpecificCard)
  .put(company.updateCard)
  .delete(company.deleteCompany);

module.exports = router;
