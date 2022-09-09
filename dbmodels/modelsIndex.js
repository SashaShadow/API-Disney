import Personaje from "./personaje.model.js";
import Pelicula from "../dbmodels/peliculas.model.js";
import Genero from "../dbmodels/genero.model.js";
import {sequelize} from "./db.js";

Pelicula.belongsToMany(Personaje, {as: 'personajes', through: 'PersonajePeliculas'});
Personaje.belongsToMany(Pelicula, {as: 'peliculas', through: 'PersonajePeliculas'});
Pelicula.belongsTo(Genero, {foreignKey: 'genero'});

await sequelize.sync();

const testDatabase = async () => {

    await sequelize.sync({force: true});
    //Tarzan
    const tarzanPer = await Personaje.create({nombre: 'Tarzan', imagen: 'nope', edad: 18, peso: 80.5, historia: 'Hombre criado entre monos'});
    const kala = await Personaje.create({nombre: 'Kala', imagen: 'nope', edad: 40, peso: 120, historia: 'Madre de Tarzan'});
    const tarzanPel = await Pelicula.create({titulo: 'Tarzan', imagen: 'nope', calificacion: 5});

    //Clasicos
    const mickey = await Personaje.create({nombre: 'Mickey Mouse', imagen: 'nope', edad: 45, peso: 50.5, historia: 'personaje marca de Disney'});
    const goofy = await Personaje.create({nombre: 'Goofy', imagen: 'nope', edad: 45, peso: 75.5, historia: 'perro amigo de Mickey, padre de Max'});
    const donald = await Personaje.create({nombre: 'Donald Duck', imagen: 'nop', edad: 44, peso: 51.4, historia: 'pato medio gruñon'});
    const mosquet = await Pelicula.create({titulo: 'Los tres mosqueteros', imagen: 'nope', calificacion: 5});
    const skmovie = await Pelicula.create({titulo: 'Extremadamente Goofy', imagen: 'nope', calificacion: 5});
    const gof2 = await Pelicula.create({titulo: 'Goofy e Hijo', imagen: 'nope', calificacion: 5});
     
    //Otras 
    const jck = await Personaje.create({nombre: 'Jack Sparrow', imagen: 'nope', edad: 38, peso: 75.5, historia: 'El capitán del Perla Negra'});
    const brbs = await Personaje.create({nombre: 'Hector Barbossa', imagen: 'no hay', edad: 52, peso: 78, historia: 'Rival de Jack, actual aliado'});
    const jim = await Personaje.create({nombre: 'Jim Hawkins'});
    const jn = await Personaje.create({nombre: 'John Silver', historia: 'Villano de la trama'});  
    
    const pir1 = await Pelicula.create({titulo: 'Piratas del Caribe', imagen: 'nope', calificacion: 5});
    const pir2 = await Pelicula.create({titulo: 'Piratas del Caribe 2: El cofre del hombre muerto', imagen: 'nope', calificacion: 5});
    const plant = await Pelicula.create({titulo: 'El planeta del tesoro', imagen: 'nope', calificacion: 5}); 
       
    const animada = await Genero.create({nombre: 'animada'});
    const aventura = await Genero.create({nombre: 'aventura'})        

    await tarzanPer.addPeliculas([tarzanPel]);
    await kala.addPeliculas([tarzanPel]);
    await mickey.addPeliculas([mosquet]);
    await goofy.addPeliculas([mosquet, skmovie, gof2])
    await donald.addPeliculas([mosquet]);
    await jck.addPeliculas([pir1, pir2]);
    await brbs.addPeliculas([pir1, pir2]);
    await jim.addPeliculas([plant]);
    await jn.addPeliculas([plant]);

    await pir1.setGenero(aventura);
    await pir2.setGenero(aventura);
    await tarzanPel.setGenero(animada);
    await mosquet.setGenero(animada);
    await skmovie.setGenero(animada);
    await gof2.setGenero(animada);
    await plant.setGenero(animada);
}

// testDatabase();

export {Personaje, Pelicula, Genero};