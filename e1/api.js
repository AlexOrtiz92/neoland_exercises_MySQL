const { appInit } = require("./appConfig");
const { bdInit } = require("./bdConf");
const api = appInit();
const bd = bdInit();

//GET all
api.get("/api/frutas", (request, response) => {
  bd.query("SELECT * FROM frutas", (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err,
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result,
      });
    }
  });
});

//GET One

api.get("/api/frutas/:id", (request, response) => {
  const { id } = request.params;

  bd.query(`SELECT * FROM frutas WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err,
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result,
      });
    }
  });
});

//POST 

api.post("/api/frutas", (request, response) => {

  const { name, qty, color, h, w } = request.body

  bd.query(`INSERT INTO frutas (name, qty, color, h, w) VALUES ("${name}",${qty},"${color}",${h},${w})`, (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result
      });
    }
  })
})

//PUT actualizar fruta

api.put("/api/frutas/:id", (request, response) => {

  const { id } = request.params;
  const { name, qty, color, h, w } = request.body

  const consulta =
    `UPDATE frutas 
  SET name = "${name}", qty = ${qty}, color = "${color}", h = ${h}, w = ${w} 
  WHERE id = ${id}`

  bd.query(consulta, (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result
      });
    }
  })
})

//PUT Complejo--> actualizar fruta (con gestion de error por si no metemos todos valores)
//Se hace añadiendo la interrogacion en el SET y añadiendo un argumento intermedio en query que es un array []
//se añade en el array en el orden de las ?

api.put("/api/frutas/complejo/:id", (request, response) => {

  const { id } = request.params;
  const { name, qty, color, h, w } = request.body

  const consulta =
    `UPDATE frutas SET name = ?, qty = ?, color = ?, h = ?, w = ? WHERE id = ?`

  bd.query(consulta, [name, qty, color, h, w, id], (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result
      });
    }
  })
})

//PUT AVANZADO
//hacemos magia, llamando a todo el objeto de request.params, el va a entender cada clave/valor y matcheara con mysql
api.put("/api/frutas/avanzado/:id", (request, response) => {

  const consulta =
    `UPDATE frutas SET ? WHERE  ?`

  bd.query(consulta, [request.body, request.params], (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        message: "fruta actualizada correctamente",
        result: result
      });
    }
  })
})

//PAGINADO OFFSET

api.get("/api/pageoffset", (request, response) => {

  const { limit, offset } = request.body

  const consulta = `SELECT * FROM frutas LIMIT ${limit} OFFSET ${offset}`

  bd.query(consulta, (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result
      });
    }

  })

})
//PAGINADO NORMAL por params

api.get("/api/page/:page", (request, response) => {

  const PAGE_SIZE = 5
  const { page } = request.params

  const offset = (page - 1) * PAGE_SIZE


  const consulta = `SELECT * FROM frutas LIMIT ${PAGE_SIZE} OFFSET ${offset}`

  bd.query(consulta, (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        result: result
      });
    }
  })
})


//DELETE

api.delete("/api/frutas/:id", (request, response) => {
  const { id } = request.params

  const consulta = `DELETE FROM frutas WHERE id = ${id}`

  bd.query(consulta, (err, result) => {
    if (err) {
      console.error(err);
      response.send({
        status: "fail",
        error: err
      });
    } else {
      response.send({
        status: "SUCCES",
        message: "eliminado correctamente"
      });
    }
  })
})

const port = "4444";
const host = "127.0.0.1";

api.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}/api/frutas`);
});
