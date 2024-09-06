const express = require('express');
const router = express.Router();
const service = require('./signupService.js');

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const passsword = req.body.password;
        console.log("Router: ",email," ", passsword)
        const answer = await service.databaseEntry(email, passsword);
        res.send(answer)

    } catch (error) {
        console.error("Error in /signup route:", error); 
        res.status(500).send({ error: 'Error generating response' });
    }
});

module.exports = router;
