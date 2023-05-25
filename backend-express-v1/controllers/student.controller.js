// import necessary modules
const Student = require('../models/Student.model');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse')

// @desc    Get all students
// @route   GET /api/v1/students
// @access  Public
exports.getStudents = asyncHandler(async(req, res, next) => {
    const students = await Student.find();

    res
        .status(200)
        .json({ success: true, count: students.length, data: students })
});

// @desc    Get student by id
// @route   GET /api/v1/students/:id
// @access  Public
exports.getStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findById(req.params.id);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    }

    res
        .status(200)
        .json({ success: true, data: student })
})

// @desc    Create a new student
// @route   POST /api/v1/students
// @access  Public
exports.createStudent = asyncHandler(async(req, res, next) => {
    const student = await Student.create(req.body);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    }

    res
        .status(201)
        .json({ success: true, message: 'Student created successfully' });
})

// @desc    Update student by id
// @route   PUT /api/v1/students/:id
// @access  Public
exports.updateStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    }

    res.status(200)
        .json({
            success: true,
            message: `Student with ID '${req.params.id}' updated successfully`
        });
})

// @desc    Delete student by id
// @route   DELETE /api/v1/students/:id
// @access  Public
exports.deleteStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    }

    res
        .status(200)
        .json({
            success: true,
            message: `Student with ID '${req.params.id}' deleted successfully`
        })
})