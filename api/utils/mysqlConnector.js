const mysql = require("mysql");

class DB {
  constructor() {
    console.log("Conectando a base...");
    this.conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234abcd",
      database: "hoteles"
    });
  }
}

/* const d = new DB();
d.conn.connect();
d.conn.query("SELECT * FROM tipoHabitacion", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
}); */

module.exports = new DB();
