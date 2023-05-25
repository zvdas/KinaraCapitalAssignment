// import student model
const Student = require('../models/student.model');

// import asyncHandler from middleware
const asyncHandler = require('../middleware/async');

// import ErrorResponse from utils
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get all students
// @route   GET /api/v1/students
// @access  Public
exports.getStudents = asyncHandler(async(req, res, next) => {
    if(req.header('accept')==='*/*') {
        res
            .status(200)
            .json(res.AdvancedResults);
    } else {
        res
            .status(200)
            .render('students', {
                results: res.AdvancedResults,
                message: ''
            });
    };
});

// @desc    Get student by id
// @route   GET /api/v1/students/:id
// @access  Public
exports.getStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findById(req.params.id);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    };

    if(req.header('accept')==='*/*') {
        res
            .status(200)
            .json({ success: true, data: student });
    } else {
        res
            .status(200)
            .render('student-details', {
                result: student,
                message: ''
            });
    };
});

// @desc    Get create new student page
// @route   GET /api/v1/students/newStudent
// @access  Public
exports.getCreateStudent = asyncHandler(async (req, res, next) => {
    res
      .status(200)
      .render('student-details', {
        result: {},
        message: ''
      });
  });

// @desc    Create a new student
// @route   POST /api/v1/students
// @access  Public
exports.createStudent = asyncHandler(async(req, res, next) => {
    console.log("post req: ", req.body);
    const student = await Student.create(req.body);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    };

    if(req.header('accept')==='*/*') {
        res
            .status(201)
            .json({ success: true, message: 'Student created successfully' });
    } else {
        res
            .status(201)
            .render('student-details', {
                result: student,
                message: 'Student created successfully'
            });
    };
});

// @desc    Update student by id
// @route   PUT /api/v1/students/:id
// @access  Public
exports.updateStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    };

    if(req.header('accept')==='*/*') {
        res
            .status(200)
            .json({
                success: true,
                message: `Student with ID '${req.params.id}' updated successfully`
            });
    } else {
        res
            .status(200)
            .render('student-details', {
                result: student,
                message: `Student with ID '${req.params.id}' updated successfully`
            });
    };
});

// @desc    Delete student by id
// @route   DELETE /api/v1/students/:id
// @access  Public
exports.deleteStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findById(req.params.id);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    };

    student.remove();

    if(req.header('accept')==='*/*') {
        res
            .status(200)
            .json({
                success: true,
                message: `Student with ID '${req.params.id}' deleted successfully`
            });
    } else {
        res
            .status(200)
            .redirect('/api/v1/students');
    };
});