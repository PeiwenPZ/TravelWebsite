const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)
//handlers
exports.getAllUsers = (req,res) => {
    //load all the tours
    res.status(500).json({
        status:'err',
        message: 'This route is not yet define'
    }) 
};

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
