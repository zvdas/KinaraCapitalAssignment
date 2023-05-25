const express = require('express');

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require('../controllers/student.controller');

const router = express.Router();

router
    .route('/')
    .get(getStudents)
    .post(createStudent);

router
    .route('/:id')
    .get(getStudentById)
    .put(updateStudentById)
    .delete(deleteStudentById);

module.exports = router;
