const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"123456",
    database:"user_sys"
});

console.log("数据库已连接");


module.exports = connection;


