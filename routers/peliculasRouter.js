import express from "express";
const { Router } = express;
const movieRouter = Router();
export default movieRouter;
import { getMovies, createMovie, updateMovie, deleteMovie, movieDetails } from "../controllers/peliculaController.js";

movieRouter.get('/', getMovies);
movieRouter.get('/:titulo/details', movieDetails);
movieRouter.post('/', createMovie);
movieRouter.put('/:titulo', updateMovie);
movieRouter.delete('/:titulo', deleteMovie);