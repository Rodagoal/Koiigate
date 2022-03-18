const cors = require("cors"); 
const express = require("express");
const app = express();
const port = 5000;
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "tedi"
});
connection.connect();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());



//post mandar
//res peticion original
//response para mandar datos
app.post('/login', (
    req, res) => {
        connection.query('SELECT * from Admin', (err, response, fields) => {
            if(err) console.log(err)
            else {
      res.send(response)
      }
    })
})

app.listen(port, function(){
    console.log("express server running on port ${port}!");
});