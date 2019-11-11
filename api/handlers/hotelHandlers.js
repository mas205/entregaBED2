const router = require("express").Router();
const Habitacion = require("../models/habitaciones");
const tipoHabitacion = require("../models/tipoHabitacion");
const reserva = require("../models/reservas");

router.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post("/room", async (req, res, next) => {
  const num = req.body.numero;
  const desc = req.body.desc;
  const costo = req.body.cost;
  const typeId = req.body.tid;
  const habilitada = req.body.habilitada;
  values = [num, desc, costo, typeId, habilitada];
  if (values.every(i => i)) {
    h = new Habitacion(...values);
    data = await h.crearHabitacion();
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "not enough info" }));
  }
});

router.put("/room", async (req, res, next) => {
  // Es necesario pasarle el objecto entero.
  const num = req.body.numero;
  const desc = req.body.desc;
  const costo = req.body.cost;
  const typeId = req.body.tid;
  const habilitada = req.body.habilitada;
  values = [num, desc, costo, typeId, habilitada];
  if (values.every(i => i)) {
    h = new Habitacion(...values);
    data = await h.editarHabitacion();
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "not enough info" }));
  }
});

router.delete("/room/:num", async (req, res, next) => {
  // Lo hice por numero de habitacion NO ID, las dos son UK, pero preferi hacerlo por numero.
  num = req.params.num;
  if (num) {
    data = await Habitacion.borrarHabitacion(num);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "Habitacion no encontrada" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/room", async (req, res, next) => {
  data = await Habitacion.obtenerHabitaciones();
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/room/:num", async (req, res, next) => {
  // Lo hice por numero de habitacion NO ID, las dos son UK, pero preferi hacerlo por numero.
  num = req.params.num;
  if (num) {
    data = await Habitacion.obtenerHabitacion(num);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "Habitacion no encontrada" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.post("/typeroom", async (req, res, next) => {
  const desc = req.body.desc;
  values = [desc];
  if (values.every(i => i)) {
    th = new tipoHabitacion(...values);
    data = await th.crearTipoHabitacion();
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "not enough info" }));
  }
});

router.put("/typeroom", async (req, res, next) => {
  // Es necesario pasarle el id por body.
  const id = req.body.id;
  const desc = req.body.desc;
  values = [id, desc];
  if (values.every(i => i)) {
    th = new tipoHabitacion(desc);
    data = await th.editarTipoHabitacion(...values);
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "not enough info" }));
  }
});

router.delete("/typeroom/:id", async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    data = await tipoHabitacion.borrarTipoHabitacion(id);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "TipoHabitacion no encontrada" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/typeroom", async (req, res, next) => {
  data = await tipoHabitacion.obtenerTipoHabitaciones();
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/typeroom/:id", async (req, res, next) => {
  id = req.params.id;
  if (id) {
    data = await tipoHabitacion.obtenerTipoHabitacion(id);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "TipoHabitacion no encontrada" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.post("/reserva", async (req, res, next) => {
  const idh = req.body.idh;
  const idu = req.body.idu;
  const fechaF = new Date(req.body.fechaF);
  const fechaI = new Date(req.body.fechaI);
  const validada = req.body.validada;

  if ([fechaI, fechaF].every(i => i == "Invalid Date")) {
    res.end(JSON.stringify({ error: "cant format date try MM-DD-YYYY" }));
  } else {
    values = [idh, idu, fechaI, fechaF, validada];
    if (values.every(i => i)) {
      r = new reserva(...values);
      data = await r.crearReserva();
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "not enough info" }));
    }
  }
});

router.put("/reserva", async (req, res, next) => {
  // es necesario pasarle el id de la reserva por el body
  const idr = req.body.idr;
  const idh = req.body.idh;
  const idu = req.body.idu;
  const fechaF = new Date(req.body.fechaF);
  const fechaI = new Date(req.body.fechaI);
  const validada = req.body.validada;

  if ([fechaI, fechaF].every(i => i == "Invalid Date")) {
    res.end(JSON.stringify({ error: "cant format date try MM-DD-YYYY" }));
  } else {
    values = [idh, idu, fechaI, fechaF, validada];
    if (values.every(i => i)) {
      r = new reserva(...values);
      data = await r.editarReserva(idr);
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "not enough info" }));
    }
  }
});

router.delete("/reserva/:id", async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    data = await reserva.borrarReserva(id);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "Reserva no encontrada" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/reservas", async (req, res, next) => {
  data = await reserva.obtenerReservas();
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/reservas/:id", async (req, res, next) => {
  id = req.params.id;
  if (id) {
    data = await reserva.obtenerReserva(id);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "Reserva no encontrada" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

module.exports = router;
