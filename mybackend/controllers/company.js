const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Company = require("../models/Company");
const Jobs =require('../models/Jobs')

// @desc      Get current logged in user
// @route     Get /api/v1/students/id/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if(req.params.id){
  const company = await Company.find({user:req.params.id});

  return res.status(200).json({
    success: true,
    data: company,
  });
}else{
  res.status(200).json(res.advancedResults);
}
});

// @desc      Get all company
// @route     GET /api/v1/company
// @access    Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single company
// @route     GET /api/v1/company/:companyId(not working)
// @route     GET /api/v1/company/companyId
// @access    Public
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with id of ${req.params.companyId}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: company });
});

// @desc      Create new company
// @route     POST /api/v1/company
// @access    Private
exports.createCompany = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published Company
  const publishedcompany = await Company.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one company
  if (publishedcompany && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a company`,
        400
      )
    );
  }

  const company = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: company,
  });
});

// @desc      Update company
// @route     PUT /api/v1/company/:companyId
// @access    Private
exports.updateCompany = asyncHandler(async (req, res, next) => {
  let company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with id of ${req.params.companyId}`,
        404
      )
    );
  }

  // Make sure user is company owner
  if (company.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.companyId} is not authorized to update this company`,
        401
      )
    );
  }

  company = await Company.findByIdAndUpdate(req.params.companyId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: company });
});

// @desc      Delete company
// @route     DELETE /api/v1/company/:companyId
// @access    Private
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with id of ${req.params.companyId}`,
        404
      )
    );
  }

  // Make sure user is company owner
  if (company.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.companyId} is not authorized to delete this company`,
        401
      )
    );
  }

  company.remove();

  res.status(200).json({ success: true, data: {} });
});


// @desc      Delete All jobs
// @route     DELETE /api/v1/company/:companyId/jobs
// @access    Private
exports.deleteAllJobs = asyncHandler(async (req, res, next) => {
  const jobs = await Jobs.find({user:req.params.jobId});

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

// @desc      Upload photo for company
// @route     PUT /api/v1/company/:companyId/photoCompany
// @access    Private
exports.companyPhotoUpload = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.companyId);

  if (!company) {
    return next(
      new ErrorResponse(
        `Company not found with id of ${req.params.companyId}`,
        404
      )
    );
  }

  // Make sure user is Company owner
  if (company.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.companyId} is not authorized to update this bootcamp`,
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
  file.name = `photo_${company._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Company.findByIdAndUpdate(req.params.companyId, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
