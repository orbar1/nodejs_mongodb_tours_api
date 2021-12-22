// import required modules
const Tour = require('./../models/tourModel');



// Get All Tours
exports.getTours = async (req, res) => {
    try {
        const allTours = await Tour.find();

        res.status(200).json({
            status: 'success',
            data: {
                tours: allTours
            }
        });
    } catch (error) {
        res.status(200).json({
            status: 'fail',
            message:"An issue occured."
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
            message:"An issue occured."
        });
    }
}

// Create A Tour
exports.createTour = async (req, res) => {
    const newTour = await Tour.create(req.body);

    try {
        res.status(201).json({
            status:"success",
            data:{
                tour: newTour
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
exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: null
    })
}

