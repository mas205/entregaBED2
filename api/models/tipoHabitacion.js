DB = require("../utils/mysqlConnector");

class TipoHabitacion {
  constructor(desc) {
    this.desc = desc;
  }

  crearTipoHabitacion() {
    const query = "insert into tipoHabitacion(nombreTipoHabitacion) values ?";
    const values = [[this.desc]];
    return new Promise((resolve, reject) => {
      DB.conn.query(query, [values], (err, results, fields) => {
        if (err) reject(err);
        resolve({ affectedRows: results.affectedRows });
        console.log(`${results.affectedRows} rows affected - RoomType added`);
      });
    });
  }

  static borrarTipoHabitacion(id) {
    const query = `delete from tipoHabitacion where idTipoHabitacion = ${DB.conn.escape(
      id
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve({ affectedRows: results.affectedRows });
      });
    });
  }

  editarTipoHabitacion(id) {
    const query = `update tipoHabitacion set nombreTipoHabitacion = ${DB.conn.escape(
      this.desc
    )} where idTipoHabitacion = ${DB.conn.escape(id)}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve({ affectedRows: results.affectedRows });
      });
    });
  }

  static obtenerTipoHabitacion(id) {
    const query = `select * from tipoHabitacion where idTipoHabitacion = ${DB.conn.escape(
      id
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static obtenerTipoHabitaciones() {
    const query = "select * from tipoHabitacion";
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = TipoHabitacion;

/* const th = new TipoHabitacion("Habitacion de mierda");
th.crearTipoHabitacion();
TipoHabitacion.obtenerHabitaciones()
  .then(i => {
    console.log(i);
  })
  .catch(e => {
    console.log(e);
  });
  */
