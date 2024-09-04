const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const bodyparser = require('body-parser');
require('express-async-errors');
const cors = require('cors');

const solverRoutes = require('./router.js');

app.use(cors({
    origin: ['http://localhost:3000', '*'],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.get('/', verifyUser, (req, res) => {
    return res.json({ status: "Success" })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong')
});

app.listen(PORT,
    () => console.log(`server running at port ${PORT}`))

app.use('/solve', solverRoutes);