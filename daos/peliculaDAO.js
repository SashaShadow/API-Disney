import {Personaje} from "../dbmodels/modelsIndex.js";
import {PersonajeTest} from "../dbmodels/modelsIndexTest.js";
import minimist from "minimist";

const options = { alias: {  m: 'MODE' } }
const myArgs = minimist(process.argv.slice(2), options)

const PersonajeModel = myArgs.MODE === 'test' ? PersonajeTest : Personaje;

class PeliculaDAO {
    constructor(model) {
        this.model = model;
    }

    async getMovies(query) {
        if (query) {
            if (query[0] === 'name') {
                const peliculas = await this.model.findAll({
                    where: {titulo: query[1]},
                    attributes: {
                        exclude: ['id', 'updatedAt', 'calificacion', 'personajes', 'genero']
                    }
                });
                return peliculas;
            } else if (query[0] === 'order') {
                const peliculas = await this.model.findAll({
                    attributes: {
                        exclude: ['id', 'updatedAt', 'calificacion', 'personajes', 'genero']
                    },
                    order: [
                        ['createdAt', query[1]]
                    ]
                });
                return peliculas;
            } else if (query[0] === 'genre') {
                const peliculas = await this.model.findAll({
                    where: {genero: query[1]},
                    attributes: {
                        exclude: ['id', 'updatedAt', 'calificacion', 'personajes', 'genero']
                    }
                });
                return peliculas;
            }
        }
        
        const peliculas = await this.model.findAll({ attributes: {
            exclude: ['id', 'updatedAt', 'calificacion', 'personajes', 'genero']
        },});
        return peliculas;
    }

    async movieDetails(peliculaId) {
        const pelicula = await this.model.findOne({
            where: {
                titulo: peliculaId
            },
            include: [
                {
                    model: PersonajeModel,
                    as: 'personajes',
                    attributes:{exclude: ['id', 'createdAt', 'updatedAt', 'edad', 'peso', 'imagen']}
                }
            ]
        })
        return pelicula;
    }
    
    async createMovie(pelicula) {
        if (pelicula.personaje) {
            const personaje = pelicula.personaje;
            delete pelicula.personaje;

            const newMovie = await this.model.create(pelicula);

            const [isChara, created] = await PersonajeModel.findOrCreate({where: {nombre: personaje}});

            await newMovie.addPersonajes(await PersonajeModel.findOne({where: {nombre: personaje}}));
            return newMovie;
        }

        const newMovie = await this.model.create(pelicula);
        return newMovie;
    }

    async updateMovie(modMovie, peliculaId) {
        if (modMovie.personaje) {
            const personaje = modMovie.personaje;
            delete modMovie.personaje;

            const modificado = await this.model.update(modMovie, {
                where: {
                    titulo: peliculaId
                }
            });

            const movie = await this.model.findOne({where: {titulo: modMovie.titulo}});

            const [isChara, created] = await PersonajeModel.findOrCreate({where: {nombre: personaje}});

            await movie.addPersonajes(await PersonajeModel.findOne({where: {nombre: personaje}}));

            return [modificado, modMovie]
        }
        const modificado = await this.model.update(modMovie, {
            where: {
                titulo: peliculaId
            }
        });
        return [modificado, modMovie]
    }

    async deleteMovie(titulo) {
        const eliminada = await this.model.destroy({
            where: {
                titulo: titulo
            }
        });
        return eliminada;
    }
}

export default PeliculaDAO;