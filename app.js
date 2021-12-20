// required modules
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const fs = require('fs')
const _ = require('lodash');
// declare app variable
const app = express();

// middleware to use req
app.use(express.json());

// define port number
const PORT = 3000

// read and parse the tours.json file
let tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));

// GET 
// Get Tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours: tours
        }
    });
});

// Get Tour
app.get('/api/v1/tours/:id', (req, res) => {
    const newId = parseInt(req.params.id)
    const tour = tours.find((item) =>
        item.id === newId
    );

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});


// POST 
// Create New Tour
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour);
    fs.writeFile(`${__dirname}/tours.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "created",
            data: {
                tour: newTour
            }
        });
    })
});

// PATCH
// Update A Tour
app.patch('/api/v1/tours/:id', (req, res) => {
    const newId = parseInt(req.params.id)
    let tour = tours.find((item) =>
        item.id === newId
    );

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }


    tour = { ...tour, ...req.body };
    tours[req.params.id] = tour;
    console.log(tour);

    fs.writeFile(`${__dirname}/tours.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: "updated",
            data: {
                tour
            }
        });
    })

});

//DELETE
// Delete Tour
app.delete('/api/v1/tours/:id', (req, res) => {
    const newId = parseInt(req.params.id);
    const tour = tours.find(item => newId === item.id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Can't delete tour, Invalid ID."
        });
    }
    
    tours = tours.filter((item)=>item.id != newId);

    fs.writeFile(`${__dirname}/tours.json`, JSON.stringify(tours), err => {
        res.status(204).json({
            status:"success",
            data: null
        });
    });

});



// tell the server to listen to the defined port
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`)
})