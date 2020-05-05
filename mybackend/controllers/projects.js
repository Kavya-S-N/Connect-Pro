const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Projects = require("../models/Projects");
const Student = require("../models/Student");
const Category = require("../models/Category");

// @desc      Get projects
// @route     GET /api/v1/projects
// @route     GET /api/v1/students/studentsId/projects
// @access    Public
exports.getProjects = asyncHandler(async (req, res, next) => {

  console.log('in Get Products')
  if (req.params.studentId) {
    const projects = await Projects.find({ user: req.params.studentId});

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
// exports.getProjects = asyncHandler(async (req, res, next) => {
//   if (req.params.studentId) {
//     const projects = await Projects.findById({ student: req.params.studentId });

//     return res.status(200).json({
//       success: true,
//       count: projects.length,
//       data: projects,
//     });
//   } else {
//     res.status(200).json(res.advancedResults);
//   }
// });

// @desc      Get single project
// @route     GET api/v1/students/studentsId/projects/projectId
// @access    Public
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Projects.findById(req.params.projectId)
    .populate({
      path: "category",
    })
    .populate({ path: "student" });

  if (!project) {
    return next(
      new ErrorResponse(`No project with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc      Add project
// @route     POST api/v1/students/studentsId/projects
// @access    Private
exports.addProject = asyncHandler(async (req, res, next) => {
  // req.body.student = req.params.studentId;
  req.body.user = req.user.id;

  const student = await Student.findOne({ user: req.user.id });

  if (!student) {
    return next(
      new ErrorResponse(`No student with the id of ${req.params.studentId}`),
      404
    );
  }

  // Make sure user is project owner
  if (student.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a project by ${student._id}`,
        401
      )
    );
  }

  const category = await Category.findById(req.body.category);
  req.body.student = student.id;
  req.body.catname = category.catname;
  const project = await Projects.create(req.body);

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc      Update project
// @route     PUT /api/v1/students/projects/projectId
// @access    Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await await Projects.find({ user: req.user.id });

  if (!project) {
    return next(
      new ErrorResponse(`No Project with the id of ${req.params.projectId}`),
      404
    );
  }

  // Make sure user is project owner
  if (project.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update project ${project._id}`,
        401
      )
    );
  }

  project= await Projects.findByIdAndUpdate(req.params.projectId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc      Delete project
// @route     DELETE /api/v1/students/studentsId/projects/projectId
// @access    Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Projects.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(`No Project with the id of ${req.params.projectId}`),
      404
    );
  }

  // Make sure user is project owner
  if (project.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete project ${project._id}`,
        401
      )
    );
  }

  await project.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Upload photo for project
// @route     PUT /api/v1/students/:studentsId/projects/:projectId/photo
// @access    Private
exports.projectPhotoUpload = asyncHandler(async (req, res, next) => {
  const project = await Projects.findById(req.params.projectId);

  if (!project) {
    return next(
      new ErrorResponse(`Projects not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is project owner
  if (project.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this project`,
        401
      )
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  let file = [];
  for (let i = 0; i < req.files.files.length; i++) {
    file[i] = req.files.files[i];

    // Make sure the image is a photo
    if (!file[i].mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file[i].size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
    name = file[i].name;
    // Create custom filename
    file[i].name = `photo_${project.id}${name}`;

    file[i].mv(
      `${process.env.FILE_UPLOAD_PATH_ITEMS}/${file[i].name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        console.log(file[i].name);
      }
    );
  }
  await Projects.findByIdAndUpdate(req.params.id, {
    photo: file,
  });
  res.status(200).json({
    success: true,
    count: req.files.files.length,
    data: file,
  });

  //   res.status(200).json({
  //     success: true,
  //     data: file.name,
  //   });
  // });
});
