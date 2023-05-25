// import express
const express = require('express');

// import student controller
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require('../controllers/student.controller');

// use AdvancedResults with student model
const AdvancedResults = require('../middleware/advancedResults');
const studentModel = require('../models/student.model');

// import router
const router = express.Router();

// match routes for path "/" to controller methods
router
.route('/')
.get(AdvancedResults(studentModel), getStudents)
.post(createStudent);

// match routes for path "/:id" to controller methods
router
    .route('/:id')
    .get(getStudentById)
    .put(updateStudentById)
    .delete(deleteStudentById);

// export router
module.exports = router;