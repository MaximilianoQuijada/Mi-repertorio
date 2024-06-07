const express = require('express');
const app = express();
const fs = require("fs").promises;

app.listen(3000)

app.use(express.json())

const { insertar, consultar, editar, eliminar } = require("./consultasRepertorio");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/cancion", async (req, res) => {
  try {
    const datos = Object.values(req.body);
    const respuesta = await insertar(datos);
    res.status(201).send(respuesta);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get("/canciones", async (req, res) => {
  try {
    const registros = await consultar();
    res.status(200).send(registros);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.put("/cancion/:id", async (req, res) => {
  try {
    const { id } = req.params
    const datos = Object.values(req.body);
    const respuesta = await editar({ datos, id });
    res.status(201).send(respuesta);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.delete("/cancion", async (req, res) => {
  try {
    const { id } = req.query;
    const respuesta = await eliminar(id);
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(error)
  }
})



  // CREATE TABLE repertorio (id SERIAL, cancion VARCHAR(50), artista VARCHAR(50), tono VARCHAR(10));