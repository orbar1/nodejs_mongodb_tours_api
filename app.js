// required modules
const express = require("express");
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// declare app variable
const app = express();

// middleware to use req
app.use(express.json());

// Routes middleware
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;