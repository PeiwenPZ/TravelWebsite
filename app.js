
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1)middlewares

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


//use middleware to receive res body JSON
app.use(express.json());

//middleware for open static files
app.use(express.static(`${__dirname}/public`));

//create our own middleware
app.use((req,res,next) => {
    console.log('Hello from the middleware.');
    next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});


//3)use our build in router- mounting the Routes


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports = app;

