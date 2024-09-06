const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyUser } = require('./middleware');
const nodemailer = require('nodemailer');

const service = require('./loginService.js')

router.post('/', async (req, res) => {
    const user = await service.loginUser(req.body);
    console.log('Login Router ', user)
    if (user) {
        console.log('token generation*******')
        const token = jwt.sign(user, "jwt-secret-key", { expiresIn: '1d' });
        console.log(token);
        res.cookie('token', token);
        // console.log(res.cookie('token', token))
        return res.json({ status: "Success" });
    } else {
        return res.json({ error: "Invalid credentials" })
    }
})

module.exports = router;