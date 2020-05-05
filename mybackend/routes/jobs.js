const express = require("express");

const {
  getJobs,
  getJob,
  getCategoryJobs,
  addJobs,
  updateJobs,
  deleteJobs,
  jobsPhotoUpload,
} = require("../controllers/jobs");
// const reviewRouter = require("./reviews");

const Jobs = require("../models/Jobs");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
// router.use("/:jobsId/reviews", reviewRouter);

router
  .route("/:jobsId/photo")
  .put(protect, authorize("company", "admin"), jobsPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Jobs, {
      path: "category",
      select: "catname",
    }),
    getJobs
  )
  .post(protect, authorize("company", "admin"), addJobs);

router
  .route("/:jobId")
  .get(getJob)
  .put(protect, authorize("company", "admin"), updateJobs)
  .delete(protect, authorize("company", "admin"), deleteJobs)
  
  
module.exports = router;
