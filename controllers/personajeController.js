import PersonajeDAO from "../daos/personajeDAO.js";
import PersonajeService from "../services/personajeService.js";
import {Personaje} from "../dbmodels/modelsIndex.js";

const personajeStorage = new PersonajeDAO(Personaje);
const personajeService = new PersonajeService(personajeStorage);

export const getCharacters = async (req, res) => {
    const nameQuery = ['nombre', req.query.name] 
    const ageQuery = ['edad', req.query.age] 
    const movieQuery = ['peliculas', req.query.movie]

    return personajeService.getCharacters(nameQuery, ageQuery, movieQuery)
    .then(personajes => res.json({personajes}))
    .catch(err => res.json({error: err}));
}

export const characterDetails = async (req, res) => {
    const personajeId = req.params.nombre;
    
    return personajeService.characterDetails(personajeId)
    .then(personaje => res.json({personaje}))
    .catch(err => res.json({error: err}));
}

export const createCharacter = async (req, res) => {
    const personaje = req.body;

    return personajeService.createCharacter(personaje)
    .then(personaje => res.json({mensaje: 'Personaje creado', personaje: personaje}))
    .catch(err => res.json({error: err}));
}

export const updateCharacter = async (req, res) => {
    const personajeMod = req.body;
    const personajeId = req.params.nombre;
    const isModified = await personajeService.updateCharacter(personajeMod, personajeId)
  
    if (isModified[0][0] > 0) {
        res.json({mensaje: 'Personaje modificado', personaje: isModified[1]})
    } else if (isModified[0][0] === 0) {
        res.json({mensaje: 'Personaje no encontrado'})
    }
}

export const deleteCharacter = async (req, res) => {
    const personaje = req.params.nombre;
    const isDeleted = await personajeService.deleteCharacter(personaje)
    
    if (isDeleted > 0) {
        res.json({mensaje: 'Personaje eliminado'})
    } else {
        res.json({mensaje: 'Personaje no encontrado'})
    }
}