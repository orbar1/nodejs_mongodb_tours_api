const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A tour must have a name.'],
        unique: true
    },
    price:{
        type: Number,
        default: 4.5
    },
    rating:{
        type: Number,
        required: [true, 'A tour must have a price.']
    }
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//     name: "First Tour",
//     price: 1.90,
//     rating: 4
// });

// testTour.save();