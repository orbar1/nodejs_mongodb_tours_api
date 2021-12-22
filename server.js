const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path:'./config.env'});

// define port number
const PORT = 3000
// define DB connection string
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASS);

// connect to the DB
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("conntected to the DB successfuly!"));


// tell the server to listen to the defined port
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`)
})