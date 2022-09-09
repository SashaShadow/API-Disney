import PeliculaDAO from "../daos/peliculaDAO.js";
import PeliculaService from "../services/peliculaService.js";
import {Pelicula} from "../dbmodels/modelsIndex.js";

const peliculaStorage = new PeliculaDAO(Pelicula);
const peliculaService = new PeliculaService(peliculaStorage);

export const getMovies = async (req, res) => {
    const orderQuery = ['order', req.query.order];
    const nameQuery = ['name', req.query.name];
    const genreQuery = ['genre', req.query.genre];

    return peliculaService.getMovies(orderQuery, nameQuery, genreQuery)
    .then(peliculas => res.json({peliculas}))
    .catch(err => res.json({error: err}));
}

export const movieDetails = async (req, res) => {
    const peliculaId = req.params.titulo;

    return peliculaService.movieDetails(peliculaId)
    .then(peliculas=> res.json({peliculas}))
    .catch(err => res.json({error: err}));
}

export const createMovie = async (req, res) => {
    const pelicula = req.body;

    return peliculaService.createMovie(pelicula)
    .then(pelicula => res.json({mensaje: 'Pelicula creada', pelicula: pelicula}))
    .catch(err => res.json({error: err}));
}

export const updateMovie = async (req, res) => {
    const peliculaMod = req.body;
    const peliculaId = req.params.titulo;

    const isModified = await peliculaService.updateMovie(peliculaMod, peliculaId);

    if (isModified[0][0] > 0) {
        res.json({mensaje: 'Pelicula modificada', pelicula: isModified[1]})
    } else if (isModified[0][0] === 0) {
        res.json({mensaje: 'Pelicula no encontrada'})
    }
}

export const deleteMovie = async (req, res) => {
    const peliculaId = req.params.titulo;

    const isDeleted = await peliculaService.deleteMovie(peliculaId);

    if (isDeleted > 0) {
        res.send('Pelicula eliminada')
    } else {
        res.send('Pelicula no encontrada')
    }
}