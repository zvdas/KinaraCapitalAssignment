// import express to create and start server
const express = require('express');

// import path to define 'views' folder
const path = require('path');

// import dotenv to call environment variables
const dotenv = require('dotenv');

// import colors to console log with text decoration
const colors = require('colors');

// load environment variables
dotenv.config({ path: './config/config.env' });

// import mongodb config files
const connectDB = require('./config/mongodb.config');

// utils files
const swaggerDocs = require('./utils/swagger');

// middleware files
const errorHandler = require('./middleware/error');

// import route files
const students = require('./routes/student.route');
const { set } = require('mongoose');

// define express app
const app = express();

// connect database
connectDB();

// use body parser
app.use(express.json());

// set public folder to serve assets
app.use(express.static(path.join(__dirname, 'public')));

// set view render engine as 'ejs'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// mount routers
app.use('/api/v1/students', students);

// use error handler
app.use(errorHandler);

//define port
const PORT = process.env.PORT || 5000;

// start express app
const server =
app.listen(
    PORT,
    () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.magenta.bold.underline);
        swaggerDocs(app, PORT);
});

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold.underline);
    // close server & exit process
    server.close(() => process.exit(1));
});