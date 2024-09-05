const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// Import router for /solve route
const solverRoutes = require('./router.js');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for your frontend
app.use(cors({
    origin: ['http://localhost:3000', '*'],  // Add your frontend URL
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Simple GET request to verify the server is working
app.get('/', (req, res) => {
    return res.json({ status: "Success" });
});

// Register the /solve route
app.use('/solve', solverRoutes);  // This registers the POST route

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong');
});

// Start the server
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
