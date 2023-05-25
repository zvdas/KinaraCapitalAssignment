// import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// load environment variables
dotenv.config({ path: './config/config.env' });

// define express app
const app = express();

//define port
const PORT = process.env.PORT || 5000;

// start express app
const server =
app.listen(
    PORT,
    () => {console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.magenta.bold.underline)
});

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold.underline);
    // close server & exit process
    server.close(() => process.exit(1));
});