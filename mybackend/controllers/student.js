const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Student = require("../models/Student");

// @desc      Get current logged in user
// @route     Get /api/v1/students/id/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if(req.params.id){
  const student = await Student.find({user:req.params.id});

  return res.status(200).json({
    success: true,
    data: student,
  });
}else{
  res.status(200).json(res.advancedResults);
}
});

// @desc      Get all students
// @route     GET /api/v1/students
// @access    Public
exports.getStudents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single student
// @route     GET /api/v1/students/:studentId(not working)
// @route     GET /api/v1/students/studentId
// @access    Public
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: student });
});

// @desc      Create new student
// @route     POST /api/v1/students
// @access    Private
exports.createStudent = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published Student
  const publishedstudent = await Student.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one Student
  if (publishedstudent && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a Student`,
        400
      )
    );
  }

  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    data: student,
  });
});

// @desc      Update student
// @route     PUT /api/v1/student/:studentId
// @access    Private
exports.updateStudent = asyncHandler(async (req, res, next) => {
  let student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }

  // Make sure user is Student owner
  if (student.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.studentId} is not authorized to update this student`,
        401
      )
    );
  }

  student = await Student.findByIdAndUpdate(req.params.studentId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: student });
});

// @desc      Delete student
// @route     DELETE /api/v1/student/:studentId
// @access    Private
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }


// @desc      Get single project
// @route     GET api/v1/projects/projectId/student/studentId
// @access    Public
// exports.getProjectStudent = asyncHandler(async (req, res, next) => {
//   const projectstudent = await Student.findById(req.params.studentId)
//     .populate({
//       path: "category",
//     })
//     .populate({ path: "project" });

//   if (!projectstudent) {
//     return next(
//       new ErrorResponse(`No project with the id of ${req.params.id}`),
//       404
//     );
//   }

//   res.status(200).json({
//     success: true,
//     data: projectstudent,
//   });
// });


  // Make sure user is Student owner
  if (student.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.studentId} is not authorized to delete this Student`,
        401
      )
    );
  }

  student.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo for student
// @route     PUT /api/v1/student/:studentId/photoStudent
// @access    Private
exports.studentsPhotoUpload = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.studentId);

  if (!student) {
    return next(
      new ErrorResponse(
        `Student not found with id of ${req.params.studentId}`,
        404
      )
    );
  }

  // Make sure user is Student owner
  if (student.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.studentId} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${student._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Student.findByIdAndUpdate(req.params.studentId, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
