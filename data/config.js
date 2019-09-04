const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dogapi'
};

const pool = mysql.createPool(config);
module.exports = pool;