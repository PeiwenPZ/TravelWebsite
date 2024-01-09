const fs = require('fs');


const tours = JSON.parse( 
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req,res,next,val) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

//checkBody middleware to make sure it contains name and price property
exports.checkBody = (req,res,next) => {
    if(!req.body.name || ! req.body.price){
        return res.status(400).json({
            status:'fail',
            message: 'Missing Name or Price'
        });
    }
    next();
};



exports.getAllTours = (req,res) => {
    //load all the tours
    console.log(req.requestTime);

    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    }) 
};

exports.getTour = (req,res) => {
    console.log(req.params);
    const id = req.params.id *1;

    
    //find is a callback function
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status:'success',
        results: tours.length,
        data: {
            tour
        }
    }) 
};

exports.createTour = (req,res) => {
    //create an instance of the new tour
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newId},req.body);
    //add to database
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err =>{
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        })

    })
};

 exports.updateTour = (req,res) => {
    res.status(200).json({
        status:'success',
        data:{
            tour: '<updated tour here...>'
        }
    });
 }

 exports.deleteTour = (req,res) => {

    res.status(204).json({
        status:'success',
        data: null
    });
};

