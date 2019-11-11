const router = require("express").Router();
const Usuario = require("../models/usuarios")

router.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post("/", async (req, res, next) => {
  const email = req.body.email;
  const pswd = req.body.pswd;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const validado = req.body.validado;
  values = [email, pswd, nombre, apellido, validado];
  if (values.every(i => i)) {
    u = new Usuario(...values);
    data = await u.crearUsuario();
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "not enough info" }));
  }
});

router.put("/", async (req, res, next) => {
  const email = req.body.email;
  const pswd = req.body.pswd;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const validado = req.body.validado;
  values = [email, pswd, nombre, apellido, validado];
  if (values.every(i => i)) {
    u = new Usuario(...values);
    data = await u.editarUsuario();
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "not enough info" }));
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    data = await Usuario.borrarUsuario(id);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "Usuario no encontrado" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/", async (req, res, next) => {
  data = await Usuario.obtenerUsuarios();
  if (data) {
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

router.get("/:id", async (req, res, next) => {
  id = req.params.id;
  if (id) {
    data = await Usuario.obtenerUsuario(id);
    if (data) {
      res.end(JSON.stringify(data));
    } else {
      res.end(JSON.stringify({ error: "Usuario no encontrado" }));
    }
  } else {
    res.end(JSON.stringify({ error: "Unexpected error!" }));
  }
});

module.exports = router;
