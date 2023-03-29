const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "root",
 database: "AgileZen",
});

conn.connect();

module.exports = conn;