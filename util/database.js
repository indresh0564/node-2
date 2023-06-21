const mysql = require('mysql2');

const pool =mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-completed',
    password:'Shahu@123'
});
module.exports =pool.promise();