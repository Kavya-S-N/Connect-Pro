const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Jobs = require("../models/Jobs");
const Company = require("../models/Company");
const Category = require("../models/Category");

// @desc      Get jobs
// @route     GET /api/v1/jobs
// @route     GET /api/v1/company/:companyId/jobs
// @access    Public
exports.getJobs = asyncHandler(async (req, res, next) => {

  console.log('in Get Products')
  if (req.params.companyId) {
    const jobs = await Jobs.find({ user: req.params.companyId });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } 
  else {
    res.status(200).json(res.advancedResults);
  }
});
// exports.getJobs = asyncHandler(async (req, res, next) => {
//   if (req.params.companyId) {
//     const jobs = await Jobs.findById({ company: req.params.companyId });

//     return res.status(200).json({
//       success: true,
//       count: jobs.length,
//       data: jobs,
//     });
//   } else {
//     res.status(200).json(res.advancedResults);
//   }
// });

// @desc      Get single jobs
// @route     GET api/v1/company/:companyId/jobs/:jobsId
// @access    Public
exports.getJob = asyncHandler(async (req, res, next) => {
  const jobs = await Jobs.findById(req.params.jobId)
    .populate({
      path: "category",
    })
    .populate({ path: "company" });

  if (!jobs) {
    return next(
      new ErrorResponse(`No jobs with the id of ${req.params.id}`),
      404
    );
  }
   res.status(200).json({
    success: true,
    data: jobs,
  });
});

// @desc      Add jobs
// @route     POST api/v1/company/:companyId/jobs
// @access    Private
exports.addJobs = asyncHandler(async (req, res, next) => {
  // req.body.company = req.params.companyId;
  req.body.user = req.user.id;

  const company = await Company.findOne({ user: req.user.id });

  if (!company) {
    return next(
      new ErrorResponse(`No company with the id of ${req.params.companyId}`),
      404
    );
  }

  // Make sure user is jobs owner
  if (company.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a jobs by ${company._id}`,
        401
      )
    );
  }

  const category = await Category.findById(req.body.category);
  req.body.company = company.id;
  req.body.catname = category.catname;
  const jobs = await Jobs.create(req.body);

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

// @desc      Update jobs
// @route     PUT /api/v1/company/:companyId/jobs/:jobsId
// @access    Private
exports.updateJobs = asyncHandler(async (req, res, next) => {
  let jobs = await Jobs.findById(req.params.jobId);

  if (!jobs) {
    return next(
      new ErrorResponse(`No jobs with the id of ${req.params.jobId}`),
      404
    );
  }

  // Make sure user is jobs owner
  if (jobs.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update jobs ${jobs._id}`,
        401
      )
    );
  }

  jobs= await Jobs.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

// @desc      Delete jobs
// @route     DELETE /api/v1/company/:companyId/jobs/:jobsId
// @access    Private
exports.deleteJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Jobs.findById(req.params.jobId);

  if (!jobs) {
    return next(
      new ErrorResponse(`No Jobs with the id of ${req.params.jobId}`),
      404
    );
  }

  // Make sure user is jobs owner
  if (jobs.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete jobs ${jobs._id}`,
        401
      )
    );
  }

  await jobs.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});



// @desc      Upload photo for jobs
// @route     PUT /api/v1/company/:companyId/jobs/:jobsId/photo
// @access    Private
exports.jobsPhotoUpload = asyncHandler(async (req, res, next) => {
  const jobs = await Jobs.findById(req.params.jobsId);

  if (!jobs) {
    return next(
      new ErrorResponse(`jobs not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is jobs owner
  if (jobs.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this jobs`,
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
    file[i].name = `photo_${jobs.id}${name}`;

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
  await Jobs.findByIdAndUpdate(req.params.id, {
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
