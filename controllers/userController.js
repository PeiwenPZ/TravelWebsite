const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req,res) => {
    //load all the tours
    res.status(500).json({
        status:'err',
        message: 'This route is not yet define'
    }) 
};

exports.updateUser = (req,res) => {
    //load all the tours
    res.status(500).json({
        status:'err',
        message: 'This route is not yet define'
    }) 
};

exports.deleteUser = (req,res) => {
    //load all the tours
    res.status(500).json({
        status:'err',
        message: 'This route is not yet define'
    }) 
};

exports.createUser = (req,res) => {
    //load all the tours
    res.status(500).json({
        status:'err',
        message: 'This route is not yet define'
    }) 
};
