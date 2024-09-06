const mysql = require('mysql2/promise');
const mysqlpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'cs211205',
    database: 'headstarter_ai'
});

module.exports = mysqlpool;