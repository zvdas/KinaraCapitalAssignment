/**
 * class ErrorResponse which takes error message and status code from
 * error middleware as a new instance for each error in the controller
 */
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// export ErrorResponse
module.exports = ErrorResponse;