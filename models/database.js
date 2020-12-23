var mysql = require('mysql');
require('dotenv').config({path:'variables.env'});

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado com sucesso ao banco de dados!");
  });

  exports.con = con;