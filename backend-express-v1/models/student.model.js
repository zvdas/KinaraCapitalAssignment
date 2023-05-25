// import necessary modules
const mongoose = require('mongoose');

// create course schema
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

// export course schema
module.exports = mongoose.model('Student', StudentSchema);