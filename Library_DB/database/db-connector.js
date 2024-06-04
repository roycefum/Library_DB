const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'XXXSS',
    user: 'XXX',
    password: 'XXX',
    database: 'ReadRenaissance',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.pool = pool.promise();
