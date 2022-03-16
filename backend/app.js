const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000;

var mysql      = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database: "tedi"
});
connection.connect();

//Configuracion para poder ver archivos .json.
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());



app.post('/login', (req, res) => { //Comprobar Usuario
  let usr = req.body;

  let DBpassw = ""
  let id = 0

  connection.query('SELECT idAdministrador FROM admin WHERE usuario = "'+ usr.usuario + '"', (err, resonse, fields) => {
      if(err) console.log(err)
      else {
        if(resonse.length>0){
          console.log(resonse)
          id = resonse[0].idCliente
          connection.query('SELECT contrasenia FROM admin WHERE usuario = "'+ usr.usuario + '"', (er, resp, fie) => {
            if(er) console.log(er)
            else{
              DBpassw = resp[0].contrasenia;

              bcrypt.compare(usr.pass, DBpassw, function(err, result) {
                res.send({result : result, token: id });
              });
            }
          })
        }
        else{
          res.send({result : false, token: -1 });
        }
      }
  })
  });
  app.listen(port, () => console.log('Example app listening on port ${port}!'))
