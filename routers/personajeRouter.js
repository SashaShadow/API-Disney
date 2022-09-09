import express from "express";
import { getCharacters, createCharacter, deleteCharacter, updateCharacter, characterDetails } from "../controllers/personajeController.js";
import {createCharaMiddleware, } from "../middlewares/createMiddlewares.js";

const { Router } = express;
const characterRouter = Router();
export default characterRouter;

characterRouter.get('/', getCharacters);
characterRouter.get('/:nombre/details', characterDetails);
characterRouter.post('/', createCharaMiddleware(), createCharacter);
characterRouter.put('/:nombre', createCharaMiddleware(), updateCharacter);
characterRouter.delete('/:nombre', deleteCharacter);

