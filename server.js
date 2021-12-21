const app = require('./app');

// define port number
const PORT = 3000

// tell the server to listen to the defined port
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`)
})