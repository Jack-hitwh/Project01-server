const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1qaz2wsx3edc',
    database: 'project01',
})

module.exports = pool.promise()