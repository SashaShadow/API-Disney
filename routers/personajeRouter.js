import express from "express";
import minimist from "minimist";

const options = { alias: {  m: 'MODE' } }

const myArgs = minimist(process.argv.slice(2), options)

import {createCharaMiddleware, } from "../middlewares/createMiddlewares.js";

const { Router } = express;
const characterRouter = Router();
export default characterRouter;

if (myArgs.MODE === 'test') {
    import("../controllers/personajeTestController.js")
    .then(fns => {
        characterRouter.get('/', fns.getCharacters);
        characterRouter.get('/:nombre/details', fns.characterDetails);
        characterRouter.post('/', createCharaMiddleware(), fns.createCharacter);
        characterRouter.put('/:nombre', createCharaMiddleware(), fns.updateCharacter);
        characterRouter.delete('/:nombre', fns.deleteCharacter);
    })
} else {
    import("../controllers/personajeController.js")
    .then(fns => {
        characterRouter.get('/', fns.getCharacters);
        characterRouter.get('/:nombre/details', fns.characterDetails);
        characterRouter.post('/', createCharaMiddleware(), fns.createCharacter);
        characterRouter.put('/:nombre', createCharaMiddleware(), fns.updateCharacter);
        characterRouter.delete('/:nombre', fns.deleteCharacter);
    })
}

