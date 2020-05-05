const express = require("express");
const {
  getMe,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getProjectStudent,
  // getStudentsInRadius,
  studentsPhotoUpload,
} = require("../controllers/student");

const Student = require("../models/Student");

// Include other resource routers
const ProjectsRouter = require("./projects");
// const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:studentId/projects", ProjectsRouter);
// router.use("/:studentId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getStudentsInRadius);

router
  .route("/:studentId/photo")
  .put(protect, authorize("student", "admin"), studentsPhotoUpload);
  
 
router
  .route("/")
  .get(advancedResults(Student, "Projects"), getStudents)
  .post(protect, authorize("student", "admin"), createStudent);

router
  .route("/:studentId")
  .get(getStudent)
  .put(protect, authorize("student", "admin"), updateStudent)
  .delete(protect, authorize("student", "admin"), deleteStudent);

  router.get("/:id/me", protect, getMe);

module.exports = router;
