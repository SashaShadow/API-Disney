import express from "express";
import minimist from "minimist";

const options = { alias: {  m: 'MODE' } }

const myArgs = minimist(process.argv.slice(2), options)

const { Router } = express;
const movieRouter = Router();
export default movieRouter;

if (myArgs.MODE === 'test') {
    import("../controllers/peliculaTestController.js")
    .then(fns => {
        // console.log(fns);
        movieRouter.get('/', fns.getMovies);
        movieRouter.get('/:titulo/details', fns.movieDetails);
        movieRouter.post('/', fns.createMovie);
        movieRouter.put('/:titulo', fns.updateMovie);
        movieRouter.delete('/:titulo', fns.deleteMovie);
    })
} else {
    import("../controllers/peliculaController.js")
    .then(fns => {
        // console.log(fns);
        movieRouter.get('/', fns.getMovies);
        movieRouter.get('/:titulo/details', fns.movieDetails);
        movieRouter.post('/', fns.createMovie);
        movieRouter.put('/:titulo', fns.updateMovie);
        movieRouter.delete('/:titulo', fns.deleteMovie);
    })
}

// movieRouter.get('/', getMovies);
// movieRouter.get('/:titulo/details', movieDetails);
// movieRouter.post('/', createMovie);
// movieRouter.put('/:titulo', updateMovie);
// movieRouter.delete('/:titulo', deleteMovie);