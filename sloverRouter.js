const express = require('express');
const router = express.Router();
const service = require('./sloverService.js');

// Define the POST route for /solve
router.post('/', async (req, res) => {
    console.log("POST /solve route hit");  // Debugging log
    try {
        // console.log(req)
        const answer = await service.generateResponse(req);
        // console.log("Router's answer: ", answer)
        // res.send(answer);  // Send the generated response
        answer.pipe(res)
    } catch (error) {
        console.error("Error in /solve route:", error);  // Log any errors
        res.status(500).send({ error: 'Error generating response' });
    }
});

module.exports = router;
