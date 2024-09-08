const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
const { verifyUser } = require('./middleware');


require('dotenv').config();
app.use(cookieParser());

// Import router for /solve route
const solverRoutes = require('./sloverRouter.js');
const signupRoutes = require('./signupRouter.js');
const loginRoutes = require('./loginRouter.js');
const logoutRoutes = require('./logoutRouter.js');
const ansRoutes = require('./simplifiedAnsRouter.js');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for your frontend
app.use(cors({
    origin: ['http://localhost:3000', '*'],  // Add your frontend URL
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Simple GET request to verify the server is working
app.get('/', verifyUser, (req, res) => {
    return res.json({ status: "Success" });
});

// Register the /solve route
app.use('/solve', solverRoutes);  // This registers the POST route
app.use('/signup', signupRoutes);  // This registers the POST route
app.use('/login', loginRoutes);  // This registers the POST route
app.use('/logout', logoutRoutes);  // This registers the POST route
app.use('/simplifiedAns', ansRoutes);  // This registers the POST route

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong');
});

// Start the server
db.query('SELECT 1')
    .then(() => {
        console.log('db connection succeeded.')
        app.listen(PORT,
            () => console.log(`server running at port ${PORT}`))
    })
    .catch(err => console.log('db connection failed. \n' + err))