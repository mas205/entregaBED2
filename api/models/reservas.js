DB = require("../utils/mysqlConnector");

class Reserva {
  constructor(idh, idu, fechaI, fechaF, validada) {
    this.idh = idh;
    this.idu = idu;
    this.fechaI = fechaI;
    this.fechaF = fechaF;
    this.validada = validada;
  }

  async crearReserva() {
    return new Promise(async (resolve, reject) => {
      const query =
        "insert into reservas(idHabitacion, idUsuario, fechaInicioReserva, fechaFinReserva, validada) values ?";
      const values = [
        [this.idh, this.idu, this.fechaI, this.fechaF, this.validada]
      ];
      const disponible = await this.checkReserva();
      if (!disponible) {
        DB.conn.query(query, [values], (err, results, fields) => {
          if (err) {
            if (err.errno === 1452) {
              resolve({
                affectedRows: 0,
                error: "Usuario o habitacion no existes"
              });
            } else {
              reject(err);
            }
          }
          if (results) {
            console.log(
              `${results.affectedRows} rows affected - Reserve added`
            );
            resolve({ affectedRows: results.affectedRows });
          } else {
            resolve({ affectedRows: 0 });
          }
        });
      } else {
        resolve({
          affectedRows: 0,
          error: "Habitacion no disponible"
        });
      }
    });
  }

  checkReserva() {
    const query = `select * from reservas
    where idHabitacion = ${DB.conn.escape(this.idh)}
    and fechaFinReserva > ${DB.conn.escape(this.fechaI)}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static borrarReserva(idReserva) {
    const query = `delete from reservas where idReserva = ${DB.conn.escape(
      idReserva
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve({ affectedRows: results.affectedRows });
      });
    });
  }

  async editarReserva(idReserva) {
    const query = `update reservas 
      set idHabitacion = ${DB.conn.escape(this.idh)},
      idUsuario = ${DB.conn.escape(this.idu)},
      fechaInicioReserva = ${DB.conn.escape(this.fechaI)},
      fechaFinReserva = ${DB.conn.escape(this.fechaF)},
      validada = ${DB.conn.escape(this.validada)}
      where idReserva = ${DB.conn.escape(idReserva)}`;
    const disponible = await this.checkReserva();
    if (!disponible) {
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
    } else {
      return new Promise((resolve, reject) => {
        resolve({ affectedRows: 0, error: "Habitacion no disponible" });
      });
    }
  }

  static obtenerReserva(idReserva) {
    const query = `select * from reservas where idReserva = ${DB.conn.escape(
      idReserva
    )}`;
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static obtenerReservas() {
    const query = "select * from reservas";
    return new Promise((resolve, reject) => {
      DB.conn.query(query, (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Reserva;

/* 
date2 = new Date();
date2.setTime(date2.getTime() + 20 * 86400000);
date1 = new Date();
date1.setTime(date1.getTime() + 10 * 86400000);
console.log(date1);
console.log(date2);
Reserva.borrarReserva(8)
  .then(i => {})
  .catch(e => console.log(e));

r = new Reserva(2, 2, date1, date2, 1);
r.crearReserva()
  .then(i => console.log(i))
  .catch(e => console.log(e)); */