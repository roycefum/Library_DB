// Adapted from 340 React Starter Code
// Source: https://github.com/osu-cs340-ecampus/react-starter-app/?tab=readme-ov-file#react-and-nodejs-assignment---connecting-to-a-mysql-database

require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.pool = pool.promise();