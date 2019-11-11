DB = require("../utils/mysqlConnector");
bcrypt = require("bcrypt");

class Usuario {
  constructor(email, pswd, nombre, apellido, validado) {
    this.email = email;
    this.pswd = pswd;
    this.nombre = nombre;
    this.apellido = apellido;
    this.validado = validado;
  }

  crearUsuario() {
    const query =
      "insert into usuarios(nombre, apellido, email, validado, hashPswd) values ?";
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.pswd, 10, (err, hash) => {
        if (err) reject(err);
        const values = [
          [this.nombre, this.apellido, this.email, this.validado, hash]
        ];
        DB.conn.query(query, [values], (err, results, fields) => {
          if (err) {
            if (err.errno === 1062) {
              resolve({
                affectedRows: 0,
                error: "Email ya usado"
              });
            } else {
              reject(err);
            }
          }
          if (results) {
            resolve({ affectedRows: results.affectedRows });
            console.log(`${results.affectedRows} rows affected`);
          } else {
            resolve({ affectedRows: 0 });
          }
        });
      });
    });
  }

  static borrarUsuario(id) {
    const query = `delete from usuarios where idUsuario = ${DB.conn.escape(
      id
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve({ affectedRows: results.affectedRows });
      });
    });
  }

  validarUsuario() {
    console.log("Empezando proceso de validacion de Usuario...");

    const query = `select hashPswd from usuarios where email = ${DB.conn.escape(
      this.email
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);

        bcrypt.compare(this.pswd, results[0].hashPswd, (err, same) => {
          if (err) reject(err);
          if (same) {
            console.log("User has been logged");
            resolve(true);
          } else {
            console.log("User not found or error");
            resolve(false);
          }
        });
      });
    });
  }

  editarUsuario() {
    const query = `update usuarios 
      set nombre = ${DB.conn.escape(this.nombre)},
      apellido = ${DB.conn.escape(this.apellido)},
      validado = ${DB.conn.escape(this.validado)}
      where email = ${DB.conn.escape(this.email)}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        if (results) {
          resolve({ affectedRows: results.affectedRows });
        } else {
          resolve({ affectedRows: 0 });
        }
      });
    });
  }

  static obtenerUsuario(id) {
    const query = `select * from usuarios where idUsuario = ${DB.conn.escape(
      id
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static obtenerUsuarios() {
    const query = "select * from usuarios";
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Usuario;

/* user = new Usuario(
  "robertohargain@gmail.com",
  "1234abcd",
  "Roberty",
  "Hargain",
  1
);
user
  .crearUsuario()
  .then(i => console.log(i))
  .catch(e => console.log("fallo"));
console.log(
  Usuario.obtenerUsuarios()
    .then(i => console.log(i))
    .catch(e => console.log("fallo"))
);
 */
