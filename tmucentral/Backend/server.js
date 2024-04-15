// This document is using Express to create an API specific for the app

const express = require('express');
const app = express();
const cors = require('cors'); // CORS allows different ports to communicate
const mongoose = require('mongoose');  // Connect Mongoose to MongoDB
const router = require('./database/route');  // Get all routes for database API

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); 


// If app not in production mode, then use the enviornment vars from the .env file
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.use('/api/database', router);

// Starting up of the DB from MongoDB Atlas
const startBackend = async() => {

    // await mongoose.connect('mongodb://127.0.0.1:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true })
    try{
        // Wait for mongoose to connect to the CPS630 DB created on Atlas
        await mongoose.connect(CONNECTION)
            .then(() => console.log('MongoDB connected successfully'))

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch(error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}
startBackend();
