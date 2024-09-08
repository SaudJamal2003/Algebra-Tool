const express = require('express')
const router = express.Router()

const services = require('./simplifiedAnsService.js');

router.post('/', async (req, res) => {
    const userInput1 = req.body.input;
    console.log("User input ", userInput1)
    const messageResponse = await services.run(userInput1);
    console.log("Response ", messageResponse)
    res.json({messageResponse});
});

module.exports = router;