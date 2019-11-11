DB = require("../utils/mysqlConnector");

class Habitacion {
  constructor(numero, desc, costo, tid, habilitada) {
    this.numero = numero;
    this.desc = desc;
    this.costo = costo;
    this.tid = tid;
    this.habilitada = habilitada;
  }

  crearHabitacion() {
    return new Promise((resolve, reject) => {
      const query =
        "insert into habitacion(numeroHabitacion, descHabitacion, costoHabitacion, idTipoHabitacion, habilitada) values ?";
      const values = [
        [this.numero, this.desc, this.costo, this.tid, this.habilitada]
      ];
      DB.conn.query(query, [values], (err, results, fields) => {
        if (err) {
          if (err.errno === 1062) {
            resolve({
              affectedRows: 0,
              error: "Numero de habitacion ya usado"
            });
          } else if (err.errno === 1452) {
            resolve({
              affectedRows: 0,
              error: "No existe ese tipo de habitacion"
            });
          } else {
            reject(err);
          }
        }
        if (results) {
          console.log(`${results.affectedRows} rows affected - Room added`);
          resolve({ affectedRows: results.affectedRows });
        } else {
          resolve({ affectedRows: 0 });
        }
      });
    });
  }

  static borrarHabitacion(numero) {
    const query = `delete from habitacion where numeroHabitacion = ${DB.conn.escape(
      numero
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve({ affectedRows: results.affectedRows });
      });
    });
  }

  editarHabitacion() {
    const query = `update habitacion 
      set numeroHabitacion = ${DB.conn.escape(this.numero)},
      descHabitacion = ${DB.conn.escape(this.desc)},
      costoHabitacion = ${DB.conn.escape(this.costo)},
      idTipoHabitacion = ${DB.conn.escape(this.tid)},
      habilitada = ${DB.conn.escape(this.habilitada)}
      where numeroHabitacion = ${DB.conn.escape(this.numero)}`;
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

  static obtenerHabitacion(numero) {
    const query = `select * from habitacion where numeroHabitacion = ${DB.conn.escape(
      numero
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static obtenerHabitaciones() {
    const query = "select * from habitacion";
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Habitacion;

/* h = new Habitacion(169, "Habitacion nueva ultimo modelo", 7000, 10, 1);
h.crearHabitacion()
  .then(i => console.log(i))
  .catch(e => console.log(e)); 

Habitacion.obtenerHabitacion(2500)
  .then(i => console.log(i))
  .catch(e => console.log(e));
*/
