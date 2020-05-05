const express = require("express");

const router = express.Router();

const { check, validationResult } = require("express-validator");
const {
  getCategories,
  getCategory,
  addCategory,
  deleteCategory,
  getCategoryProject,
  getCategoryJobs,
  updateCategory,
} = require("../controllers/category");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const Category = require("../models/Category");

router
  .route("/")
  .get(advancedResults(Category, {path: "category",select: "name",}),getCategories)
  .post(protect, authorize("admin"), addCategory);

  router
  .route("/:categoryId")
  .get(getCategory)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

router
  .route("/:categoryId/projects")
  .get(getCategoryProject)
  // .put(protect, authorize("admin"), updateCategory)
  // .delete(protect, authorize("admin"), deleteCategory);

  router
  .route("/:categoryId/jobs")
  .get(getCategoryJobs)
  // .put(protect, authorize("admin"), getCategoryJobs)
  // .delete(protect, authorize("admin"), getCategoryJobs);

// router.route("/:categoryId").get(getCategory);
// router.route("/:categoryId/projects").get(getCategoryProject);
// router.route("/:categoryId/jobs").get(getCategoryJobs);

module.exports = router;
