import express from "express";
import minimist from "minimist";
import "dotenv/config.js";
import authRouter from "./routers/auth.js"; 
import characterRouter from './routers/personajeRouter.js';
import movieRouter from "./routers/peliculasRouter.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const options = { alias: {  p: 'PORT' } }
const myArgs = minimist(process.argv.slice(2), options)
const app = express();

const PORT = myArgs.PORT || process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
});

server.on("error", error => console.log(`Error en el servidor: ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
// app.use('/characters', authMiddleware, characterRouter);
// app.use('/movies', authMiddleware, movieRouter);
app.use('/characters', characterRouter);
app.use('/movies', movieRouter);