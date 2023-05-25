/**
 * function asyncHandler takes in the (req, res, next) from the controller methods,
 * creates a promise and resolves the promise, thus converting the async function
 * into a promise
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn (req, res, next)).catch(next);
}

// export asyncHandler
module.exports = asyncHandler;