// import express
const express = require('express');

// import student controller
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getCreateStudent,
} = require('../controllers/student.controller');

// use AdvancedResults with student model
const AdvancedResults = require('../middleware/advancedResults');
const studentModel = require('../models/student.model');

// import router
const router = express.Router();

router
  .get('/newStudent', getCreateStudent);

// swagger openAPI routes for '/' path
/**
 * @openapi
 * tags:
 *   name: Students
 *   description: APIs to perform CRUD operations on students
 * /api/v1/students:
 *   get:
 *     tags:
 *       - Students
 *     description: Retrieve a list of all the students from the database. The list is paginated and five students are displayed per page.
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Students
 *     description: Add a student to the database.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Please enter correct details
 *       500:
 *         description: Internal server error
 */
// match routes for path "/" to controller methods
router
  .route('/')
  .get(AdvancedResults(studentModel), getStudents)
  .post(createStudent);

// swagger openAPI routes for '/:id' path
/**
 * @openapi
 * /api/v1/students/{id}:
 *   get:
 *     tags:
 *       - Students
 *     description: Get Student By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the student to retrieve
 *         schema:
 *           type: string
 *           example: 646f1a2130436661023f9bb2
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Students
 *     description: Update student by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the student to update
 *         schema:
 *           type: string
 *           example: 646f1a2130436661023f9bb2
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Please enter correct id & details
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the student to delete
 *         schema:
 *           type: string
 *           example: 646f1a2130436661023f9bb2
 *     description: Delete student by id.
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Please enter correct id
 *       500:
 *         description: Internal server error
 */
// match routes for path "/:id" to controller methods
router
  .route('/:id')
  .get(getStudentById)
  .put(updateStudentById)
  .delete(deleteStudentById);

// export router
module.exports = router;