const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.clearCookie('token')
    return res.json({ status: "Success" })
});

module.exports = router