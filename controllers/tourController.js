// import required modules
const Tour = require('./../models/tourModel');

// Get All Tours
exports.getTours = async (req, res) => {
    try {
        // Filtering req.query
        const queryObject = {...req.query};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el => delete queryObject[el]);
        
        // Advanced filtering for req.query
        queryObjectAsString=JSON.stringify(queryObject);
        queryObjectAsString = queryObjectAsString.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`);
        const tours = await Tour.find(JSON.parse(queryObjectAsString));
        

        res.status(200).json({
            length: tours.length,
            status: 'success',
            data: {
                tours
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message:error
        });
    }
    
}

// Get A Tour
exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (error) {
        res.status(200).json({
            status: 'fail',
            message:error
        });
    }
}

// Create A Tour
exports.createTour = async (req, res) => {
    const tour = await Tour.create(req.body);

    try {
        res.status(201).json({
            status:"success",
            data:{
                tour
            }
        });

    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:"Invalid info."
        });
    }
};

// Update A Tour
exports.updateTour = async (req, res) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    try {
        res.status(201).json({
            status:"success",
            data:{
                tour
            }
        });

    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:"Invalid info."
        });
    }
}


// Delete A Tour
exports.deleteTour = async (req, res) => {
    try {
       await Tour.findByIdAndDelete(req.params.id); 

       res.status(204).json({
            status: "success",
            message:"Tour deleted"
       });
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message: "Invalid"
        });
    }
    

 
}

