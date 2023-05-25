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

// import router
const router = express.Router();

// match routes for path "/" to controller methods
router
.route('/')
.get(getStudents)
.post(createStudent);

// match routes for path "/:id" to controller methods
router
    .route('/:id')
    .get(getStudentById)
    .put(updateStudentById)
    .delete(deleteStudentById);

// export router
module.exports = router;