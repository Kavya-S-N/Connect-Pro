const express = require("express");

const {
  getProjects,
  getProject,
  // getStudent,
  getCategoryProject,
  addProject,
  updateProject,
  deleteProject,
  projectPhotoUpload,
} = require("../controllers/projects");
// const reviewRouter = require("./reviews");

const Project = require("../models/Projects");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
// const StudentRouter = require("./students");
// router.use("/:projectId/reviews", reviewRouter);

router
  .route("/:projectId/photo")
  .put(protect, authorize("student", "admin"), projectPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Project, {
      path: "category",
      select: "catname",
    }),
    getProjects
  )
  .post(protect, authorize("student", "admin"), addProject);

router
  .route("/:projectId")
  .get(getProject)
  .put(protect, authorize("student", "admin"), updateProject)
  .delete(protect, authorize("student", "admin"), deleteProject);

  

module.exports = router;
