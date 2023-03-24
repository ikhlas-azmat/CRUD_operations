require("dotenv").config();
const mysql = require("mysql2");

const mysqlconnection = mysql.createConnection({
    host: process.env.HOSTNAME || "127.0.0.1",
    user: process.env.USERDB || "root",
    password: process.env.PASSWORD || "abc123",
    database: process.env.DATABASE || "crudDB"
})

mysqlconnection.connect((err) => {
    if(err){
        console.log("error while connecting to DB" + JSON.stringify(err, undefined, 2));
    }
    else{
        console.log("connected to DB");
    }
})

module.exports = mysqlconnection;