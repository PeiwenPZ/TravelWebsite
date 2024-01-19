const express = require('express');

const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//1)middlewares

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//use middleware to receive res body JSON
app.use(express.json());

//middleware for open static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3)use our build in router- mounting the Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//handling unhandle Routes
app.all('*', (req, res, next ) => {
//   console.log('Handling 404 error');
//   console.log('Original URL:', req.originalUrl);
//   res.status(404).json({
//     status: 'fail',
//     message: `Cannot find ${req.originalUrl} on this server!!`,
//   });
  next(new AppError(`Cannot find ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
