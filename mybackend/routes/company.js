const express = require("express");
const {
  getMe,
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  // getCompanyInRadius,
  deleteAllJobs,
  companyPhotoUpload,
} = require("../controllers/company");

const Company = require("../models/Company");

// Include other resource routers
const JobRouter = require("./jobs");
// const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:companyId/jobs", JobRouter);
// router.use("/:companyId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getCompanyInRadius);

router
  .route("/:companyId/photo")
  .put(protect, authorize("company", "admin"), companyPhotoUpload);

  router.get("/:id/me", protect, getMe);

router
  .route("/")
  .get(advancedResults(Company, "Jobs"), getCompanies)
  .post(protect, authorize("company", "admin"), createCompany);

router
  .route("/:companyId")
  .get(getCompany)
  .put(protect, authorize("company", "admin"), updateCompany)
  .delete(protect, authorize("company", "admin"), deleteCompany)

  router
  .route("/:companyId/jobs").
  delete(protect, authorize("company", "admin"), deleteAllJobs);


module.exports = router;
