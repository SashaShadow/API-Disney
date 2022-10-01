import PersonajeDAO from "../daos/personajeDAO.js";
import PersonajeService from "../services/personajeService.js";
import {PersonajeTest} from "../dbmodels/modelsIndexTest.js";

const personajeStorage = new PersonajeDAO(PersonajeTest);
const personajeService = new PersonajeService(personajeStorage);

export const getCharacters = async (req, res) => {
    const nameQuery = ['nombre', req.query.name] 
    const ageQuery = ['edad', req.query.age] 
    const movieQuery = ['peliculas', req.query.movie]

    return personajeService.getCharacters(nameQuery, ageQuery, movieQuery)
    .then(personajes => res.status(200).json({personajes}))
    .catch(err => res.status(500).json({error: err}));
}

export const characterDetails = async (req, res) => {
    const personajeId = req.params.nombre;
    
    return personajeService.characterDetails(personajeId)
    .then(personaje => {
        personaje ? res.status(200).json({personaje}) : res.status(404).json({error: 'Personaje no encontrado'})
    })
    .catch(err => res.json({error: err.toString()}));
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
        res.status(201).json({mensaje: 'Personaje modificado', personaje: isModified[1]})
    } else if (isModified[0][0] === 0) {
        res.status(404).json({error: 'Personaje no encontrado o con formato erróneo'})
    }
}

export const deleteCharacter = async (req, res) => {
    const personaje = req.params.nombre;
    const isDeleted = await personajeService.deleteCharacter(personaje)
    
    if (isDeleted > 0) {
        res.status(200).json({mensaje: 'Personaje eliminado'})
    } else {
        res.status(404).json({error: 'Personaje no encontrado'})
    }
}