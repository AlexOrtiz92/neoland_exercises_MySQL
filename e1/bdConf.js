const mysql = require('mysql');

const bdInit = () => {


  const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'BBDD'
  });


  bd.connect((err) => {
    if (err) console.error(err);
    else console.log("Conexion con MYSQL correcta")
  });

  return bd
}

module.exports = {
  bdInit: bdInit
}