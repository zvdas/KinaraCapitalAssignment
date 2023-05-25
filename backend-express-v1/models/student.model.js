// import mongoose
const mongoose = require('mongoose');

// swagger openApi model
/**
 * @openapi
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           required: true
 *         name:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         stream:
 *           type: string
 *           required: true
 *         totalMarks:
 *           type: number
 *       additionalProperties: false
 */
// create student schema
const StudentSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: [true, 'Please enter an ID']
    },
    name: {
        type: String,
        required: [true, "Please enter a student's name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email address"],
    },
    stream: {
        type: String,
        required: [true, 'Please choose a stream'],
        enum: [
            'Arts',
            'Science',
            'Commerce',
            'Vocational',
            'BCA'
        ]
    },
    totalMarks: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// export student schema
module.exports = mongoose.model('Student', StudentSchema);