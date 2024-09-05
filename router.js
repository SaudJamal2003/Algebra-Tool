const express = require('express');
const router = express.Router();
const service = require('./service.js');

// Define the POST route for /solve
router.post('/', async (req, res) => {
    console.log("POST /solve route hit");  // Debugging log
    try {
        const answer = await service.generateResponse(req);
<<<<<<< HEAD
=======
        // console.log("Router's answer: ", answer)
        // res.send(answer);  // Send the generated response
>>>>>>> e534bda30172f08deeaa1882b35b1b46a9e9ad06
        answer.pipe(res)
    } catch (error) {
        console.error("Error in /solve route:", error);  // Log any errors
        res.status(500).send({ error: 'Error generating response' });
    }
});

module.exports = router;
