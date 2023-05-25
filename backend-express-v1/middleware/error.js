// import errorResponse
const ErrorResponse = require('../utils/errorResponse');

/**
 * errorHandler function, which takes in specific errors and returns
 * user defined error messages & status codes
 */
errorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = err.message;

    // log to console for dev
    console.log(err);

    // mongoose bad ObjectId
    if(err.name === 'CastError') {
        const message = `Resource with ID '${err.value}' not found`;
        error = new ErrorResponse(message, 404);
    }

    // mongoose duplicate key
    if(err.code === 11000) {
        const message = `Resource name already exists. Duplication of the sane is not permitted`;
        error = new ErrorResponse(message, 400);
    }

    // mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res
        // status code default for internal server error
        .status(err.statusCode || 500)
        .json({ status: false, error: err.message || 'Server Error' });
}

// export errorHandler
module.exports = errorHandler;