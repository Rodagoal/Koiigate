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

/*app.get("/", function(req, res) {
    res.send("Node here!");
})*/

app.post('/', (
    req, res) => {
    res.send(connection.query('SELECT * from Admin'));
})

app.listen(port, function(){
    console.log("express server running on port ${port}!");
});