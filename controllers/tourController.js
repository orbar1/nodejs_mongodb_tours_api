// import required modules
const fs = require('fs');

// read and parse the tours.json file
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../tours.json`));

// exports.checkID = (req,res,next,val)=>{
//     console.log(val);
//     next();
// }

exports.checkBody = (req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:"fail",
            message:"missing info!"
        });
    }
    next();
}

// getTours
exports.getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours: tours
        }
    });
}

// getTour
exports.getTour = (req, res) => {
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
}

// createTour
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../tours.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "created",
            data: {
                tour: newTour
            }
        });
    })
}

exports.updateTour = (req, res) => {
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

    fs.writeFile(`${__dirname}/../tours.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: "updated",
            data: {
                tour
            }
        });
    })

}

// deleteTour
exports.deleteTour = (req, res) => {
    const newId = parseInt(req.params.id);
    const tour = tours.find(item => newId === item.id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Can't delete tour, Invalid ID."
        });
    }

    tours = tours.filter((item) => item.id != newId);

    fs.writeFile(`${__dirname}/../tours.json`, JSON.stringify(tours), err => {
        res.status(204).json({
            status: "success",
            data: null
        });
    });

}

