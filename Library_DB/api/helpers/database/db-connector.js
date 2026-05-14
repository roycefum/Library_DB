// Adapted from 340 React Starter Code
// Source: https://github.com/osu-cs340-ecampus/react-starter-app/?tab=readme-ov-file#react-and-nodejs-assignment---connecting-to-a-mysql-database

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'read_renaissance',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.pool = pool.promise();
