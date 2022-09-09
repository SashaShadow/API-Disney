import {Pelicula} from "../dbmodels/modelsIndex.js";

class PersonajeDAO {
    constructor(model) {
        this.model = model;
    }

    async getCharacters(query) {
        if (query) {
            if (query[0] !== 'peliculas') {
                const column = query[0];
                const searched = query[1];
                const personajes = await this.model.findAll({
                    where: { 
                        [column]: searched
                        },
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'edad', 'peso', 'historia']
                    },
                });
                return personajes;
            } else {
                const pelicula = await Pelicula.findOne({where: {titulo: query[1]}});

                if (pelicula) {
                    const personajes = await pelicula.getPersonajes({ joinTableAttributes: [] });
                    const personajesNameImage = personajes.map(personaje => {
                        return {nombre: personaje.nombre,
                        imagen: personaje.imagen}
                    });
                    return personajesNameImage;
                } else {
                    return 'Pelicula no encontrada'
                }
            }
        }   
        
        const personajes = await this.model.findAll({ attributes: {
            exclude: ['id', 'createdAt', 'updatedAt', 'edad', 'peso', 'historia']
        },});
        return personajes;
    }

    async characterDetails(personajeId) {
        const personaje = await this.model.findOne({
            where: {
                nombre: personajeId
            },
            include: [
                {
                    model: Pelicula,
                    as: 'peliculas',
                    attributes:['titulo']
                }
            ]
        })
        return personaje;
    }
    
    async createCharacter(personaje) {
        if (personaje.pelicula) {
            const pelicula = personaje.pelicula;

            delete personaje.pelicula;

            const newCharacter = await this.model.create(personaje);

            const [isMovie, created] = await Pelicula.findOrCreate({where: {titulo: pelicula}});

            await newCharacter.addPeliculas(await Pelicula.findOne({where: {titulo: pelicula}})) 
            return newCharacter;
        }

        const newCharacter = await this.model.create(personaje);
        return newCharacter;
    }

    async updateCharacter(modCharacter, personajeId) {
        if (modCharacter.pelicula) {
            const pelicula = modCharacter.pelicula;
            delete modCharacter.pelicula;
        
            const modificado = await this.model.update(modCharacter, {
                where: {
                    nombre: personajeId
                }
            });

            const character = await this.model.findOne({where: {nombre: modCharacter.nombre}});

            const [isMovie, created] = await Pelicula.findOrCreate({where: {titulo: pelicula}});

            await character.addPeliculas(await Pelicula.findOne({where: {titulo: pelicula}}));

            return [modificado, modCharacter]
        }

        const modificado = await this.model.update(modCharacter, {
            where: {
                nombre: personajeId
            }
        });

        return [modificado, modCharacter]
    }

    async deleteCharacter(nombre) {
        const eliminado = await this.model.destroy({
            where: {
                nombre: nombre
            }
        });
        return eliminado;
    }
}

export default PersonajeDAO;