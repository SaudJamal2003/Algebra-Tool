const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.post('/solve', async (req, res) => {
    const answer = await service.generateResponse(req);
    res.send(answer);
});

module.exports = router