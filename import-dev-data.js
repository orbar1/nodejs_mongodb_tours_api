const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./models/tourModel');

dotenv.config({path:'./config.env'});

// define DB connection string
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASS);

// connect to the DB
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("conntected to the DB successfuly!"));

const data = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// Add all tours from the JSON file to the DB
const importAllTours = async()=>{
    try {
        await Tour.create(data);
        console.log("Added successfuly!");
    } catch (error) {
        console.log(error);
    }
}

// Delete all tours from DB
const deleteAllTours = async()=>{
    try {
        await Tour.deleteMany();
        console.log("Deleted successfuly!");
    } catch (error) {
        consoloe.log(error);
    }
}

deleteAllTours();
importAllTours();