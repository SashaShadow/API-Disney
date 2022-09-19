import PersonajeTest from "./personajeTest.model.js";
import PeliculaTest from "./peliculasTest.model.js";
import Genero from "./genero.model.js";
import {sequelize} from "./db.js";

PeliculaTest.belongsToMany(PersonajeTest, {as: 'personajes', through: 'PersonajePeliculasTest'});
PersonajeTest.belongsToMany(PeliculaTest, {as: 'peliculas', through: 'PersonajePeliculasTest'});
PeliculaTest.belongsTo(Genero, {foreignKey: 'genero'});

await sequelize.sync();

export {PersonajeTest, PeliculaTest, Genero};