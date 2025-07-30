import express from "express";
import { conn } from "./conn.js"

//Tabelas
import Usuario from "./model/Usuario.js";
import Perfil from "./model/Perfil.js";

const PORT = 3333

const app = express();

conn.sync();
// ({force: true}

app.listen(PORT, ()=>{
    console.log("Servidor On")
})