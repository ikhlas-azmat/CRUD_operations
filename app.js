const express =  require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const mysqlconnection = require("./config/db");

const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.listen(port, () => 
    console.log(`app is listening to port: ${port}`)
);

var welcome= "Welcome";

app.get('/', (request, response) => {
    response.send(welcome)
})

app.get('/users', (req, res) => {
    mysqlconnection.query('SELECT * FROM users;', (err, rows)=>{
        if(err){
            console.log(err);
        }
        else {
            // console.log(rows);
            res.send(rows);
        }
    })
})

app.get('/users/:id', (req, res) => {
    mysqlconnection.query('SELECT * FROM users WHERE id=?;', [req.params.id], (err, rows) => {
        if(err){
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})

app.delete('/users/:id', (req, res)=> {
    mysqlconnection.query('DELETE FROM users WHERE id=?;', [req.params.id], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})

app.post('/users', (req,res) => {
    const data = req.body;
    const userData = [data.user_name,data.age]
    mysqlconnection.query('INSERT INTO users(user_name, age) VALUES(?);', [userData], (err,rows)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})

app.patch('/users/:id', (req, res) => {
    const data = req.body;
    const userData = [data.user_name]
    mysqlconnection.query('UPDATE users SET user_name = ? WHERE id = ?', [userData, req.params.id], (err,rows)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    })
})

app.put('/users/:id', (req, res)=>{
    const data = req.body;
    const userData = [data.user_name, data.age];
    mysqlconnection.query("UPDATE users SET ? WHERE id = ? ", [data, req.params.id], (err, rows)=>{
        if(err){
            console.log(err);
        }
        else {
            if (rows.affectedRows === 0) {
                mysqlconnection.query("INSERT INTO users (user_name, age) VALUES (?)", [userData], (err, rows) => {
                    if(err){
                        console.log(err);
                    }
                    else {
                        res.send(rows);
                    }
                })
            } else {
                res.send(rows)
            }
        }
    })
})