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
    /**
     * query is current logged as "{ totalMarks: { gt: '60' } }",
     * however mongoDB accepts "{ totalMarks: { $gt: '60' } }" as a query
     */
    let query;

    // create a copy of request query to exclude certain fields
    const reqQuery = {...req.query};

    // fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // loop over remove fields and delete them from reqQuery
    removeFields.map(param => delete reqQuery[param]);

    // stringify the query and replace the gt/gte/le/lte/in with $gt/$gte/$lt/$lte/$in
    let queryStr =
    JSON
        .stringify(reqQuery)
        .replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // parse the query string and send to database with find method
    query = Student.find(JSON.parse(queryStr));

    // select fields
    if(req.query.select) {
        /**
         * replace the query 'id,name,email' by 'id name email'
         * which is accepted by mongoDB select query
         */
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // sort fields
    if(req.query.sort) {
        /**
         * replace the query 'id,name,email' by 'id name email'
         * which is accepted by mongoDB sort query
         */
        const fields = req.query.sort.split(',').join(' ');
        query = query.sort(fields);
    } else {
        // default sort by date of creation in descending order
        query = query.sort('-createdAt');
    }

    // pagination
    /**
     * parse the page number and limit from query as integer base 10
     * default page without query is page 1 and
     * default limit without query is 10 entries per page
     * skip specifies the number of documents to skip (where to start/end)
     * total specifies the total number of documents in collection
     */
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Student.countDocuments();
    query = query.skip(startIndex).limit(limit);

    // pagination result
    const pagination = {};

    // next page
    if(endIndex > total) {
        pagination.next = {
            page: page + 1,
        }
    }

    // current page
    pagination.curr = {
        page: page,
    }

    // next page
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
        }
    }

    // execute query
    // const students = await Student.find(req.query);
    const students = await query;

    if(req.header('accept')==='*/*') {
        res
            .status(200)
            .json({ success: true, count: students.length, total, limit, pagination, data: students });
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
    };
});

// @desc    Create a new student
// @route   POST /api/v1/students
// @access  Public
exports.createStudent = asyncHandler(async(req, res, next) => {
    const student = await Student.create(req.body);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    };

    if(req.header('accept')==='*/*') {
        res
            .status(201)
            .json({ success: true, message: 'Student created successfully' });
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
    };
});

// @desc    Delete student by id
// @route   DELETE /api/v1/students/:id
// @access  Public
exports.deleteStudentById = asyncHandler(async(req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if(!student) {
        return next(new ErrorResponse(`Student with '${req.params.id}' not found`, 404));
    };

    if(req.header('accept')==='*/*') {
        res
            .status(200)
            .json({
                success: true,
                message: `Student with ID '${req.params.id}' deleted successfully`
            });
    };
});