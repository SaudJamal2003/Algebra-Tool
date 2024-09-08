// require('dotenv').config();

// const mysql = require('mysql2/promise');
// const mysqlpool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'cs211205',
//     database: 'headstarter_ai'
// });

// module.exports = mysqlpool;

// require('dotenv').config();

// const mysql = require('mysql2/promise');
// const mysqlpool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// module.exports = mysqlpool;

require('dotenv').config();
const mysql = require('mysql2/promise');

const url_DB = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_MYSQLDB}`
const mysqlpool = mysql.createPool(url_DB);

module.exports = mysqlpool;