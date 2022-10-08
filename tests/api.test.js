import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';

const PORT = 8080;

const myReq = request(`http://localhost:${PORT}`);

//ASEGURARSE ANTES DE INICIAR LOS TESTS DE INICIAR EL SERVER CON EL COMANDO --m test PARA UTILIZAR EL MODO PARA TESTING.
//PARA INICIAR LOS TESTS EJECUTAR POR CONSOLA npm test
//EL PUERTO INICIA POR DEFAULT EN 8080, SI SE INICIA EL SERVIDOR CON OTRO PUERTO CAMBIAR EN ESTE ARCHIVO EL PUERTO ELEGIDO.
//LAS TABLAS DE PELICULAS Y PERSONAJES ESTÁN VACIAS AL INICIO Y SOLO SE MANEJAN UN PERSONAJE/PELICULA QUE SE AGREGA Y ELIMINA CON LOS MISMOS TESTS.

describe('Tests a las funciones CRUD de los Personajes y Peliculas', function() {

    //CHARACTERS TESTS....................................................................................
    it('should list all available characters (GET /characters)', async () => {
            let response = await myReq.get('/characters')
            expect(response.status).to.eql(200);
            expect(response.body.personajes.length).to.eql(0);
    }) 

    it('should create a new character (POST /characters)', async () => {
        const newCharacter = {
            nombre: 'Jim Hawkins',
            imagen: 'no disponible',
            edad: 18,
            peso: 60.0,
            historia: 'Navegante curioso en busqueda de un tesoro'
        }

        let response = await myReq.post('/characters').send(newCharacter);
        expect(response.status).to.be.equal(201);

        const character = response.body.personaje;
        expect(character).to.include.keys('nombre', 'imagen', 'edad', 'peso', 'historia');
        expect(character.nombre).to.eql(newCharacter.nombre);
        expect(character.imagen).to.eql(newCharacter.imagen);
        expect(character.edad).to.eql(newCharacter.edad);
        expect(character.peso).to.eql(newCharacter.peso);
        expect(character.historia).to.eql(newCharacter.historia);

        let allCharacters = await myReq.get('/characters')
            expect(allCharacters.status).to.eql(200);
            expect(allCharacters.body.personajes.length).to.eql(1);
    })

    it('should return an error message if character format is incorrect when creating a new one', async () => {
        const newCharacter = {
            nombre: 'Jim Hawkins',
            foto: 'no disponible',
            edad: 18,
            peso: 60.0,
            historia: 'Navegante curioso en busqueda de un tesoro'
        }

        let response = await myReq.post('/characters').send(newCharacter);
        expect(response.body.error).to.eql('parametros incorrectos');
        expect(response.status).to.eql(400);
    })

    it('should list the character details with the given name (GET /characters/:nombre/details)', async () => {
        let response = await myReq.get('/characters/Jim Hawkins/details')
        expect(response.status).to.eql(200);

        const character = response.body.personaje;
        expect(character).to.include.keys('nombre', 'imagen', 'edad', 'peso', 'historia');
    })

    it('should return a error message when the given name character does not exist (GET /characters/:nombre/details)', async () => {
        let response = await myReq.get('/characters/Jim Jackson/details')
        expect(response.status).to.eql(404);

        const error = response.body.error;
        expect(error).to.eql('Personaje no encontrado')
    })

    it('should update the character with the given name (PUT /characters/:nombre)', async () => {
        const updatedCharacter = {
            nombre: 'Jim HAWWWKINS',
            imagen: 'no disponible',
            edad: 18,
            peso: 60.0,
            historia: 'Navegante curioso en busqueda de un tesoro'
        }

        let update = await myReq.put('/characters/Jim Hawkins').send(updatedCharacter);
        expect(update.status).to.be.equal(201);
        expect(update.body.personaje).to.eql(updatedCharacter);
    })

    it('should return an error message when trying to update the character with wrong format (PUT /characters/:nombre)', async () => {
        const updatedCharacter = {
            titulo: 'Jim Hawkins',
            foto: 'no disponible',
            edad: 18,
            peso: 60.0,
            historia: 'Navegante curioso en busqueda de un tesoro'
        }

        let update = await myReq.put('/characters/Jim Hawkins').send(updatedCharacter);
        expect(update.status).to.be.equal(400);
        expect(update.body.error).to.eql('parametros incorrectos');
    })

    it('should delete the character with the given name (DELETE /characters/:nombre)', async () => {
        let allCharacters = await myReq.get('/characters')
        let charaName = allCharacters.body.personajes[0].nombre;

        let deleted = await myReq.delete(`/characters/${charaName}`);
        allCharacters = await myReq.get('/characters')

        expect(deleted.status).to.eql(200); 
        expect(allCharacters.body.personajes.length).to.eql(0);
    })

    it('should return an error message when trying to delete a character that does not exist (DELETE /characters/:nombre)', async () => {
        let deleted = await myReq.delete(`/characters/Jim Jackson`);

        expect(deleted.status).to.eql(404); 
        expect(deleted.body.error).to.eql('Personaje no encontrado')
    })

    before(function() {
        console.log('\n ------------------------COMIENZO TOTAL DE LOS TEST----------------------------')
    })

    after(function() {
        console.log('\n ------------------------FIN TOTAL DE LOS TEST----------------------------')
    })

    //MOVIES TESTS....................................................................................
    it('should list all available movies (GET /movies)', async () => {
        let response = await myReq.get('/movies')
        expect(response.status).to.eql(200);
        expect(response.body.peliculas.length).to.eql(0);
    }) 

    it('should create a new movie (POST /movies)', async () => {
        const newMovie = {
           titulo: 'El Planeta del Tesoro',
           imagen: 'no disponible',
           calificacion: 5
        }

        let response = await myReq.post('/movies').send(newMovie);
        expect(response.status).to.be.equal(201);

        const movie = response.body.pelicula;
        expect(movie).to.include.keys('titulo', 'imagen', 'calificacion');
        expect(movie.titulo).to.eql(newMovie.titulo);
        expect(movie.imagen).to.eql(newMovie.imagen);
        expect(movie.calificacion).to.eql(newMovie.calificacion);

        let allMovies = await myReq.get('/movies')
            expect(allMovies.status).to.eql(200);
            expect(allMovies.body.peliculas.length).to.eql(1);
    })

    it('should return an error message if movie format is incorrect when creating a new one', async () => {
        const newMovie = {
            title: 'El Planeta del Tesoro',
            imagen: 'no disponible',
            calificacion: 5
        }

        let response = await myReq.post('/movies').send(newMovie);
        expect(response.body.error.name).to.eql('SequelizeValidationError');
        expect(response.status).to.eql(400);
    })

    it('should list the movie details with the given title (GET /movies/:titulo/details)', async () => {
        let response = await myReq.get('/movies/El Planeta del Tesoro/details')
        expect(response.status).to.eql(200);

        const movie = response.body.peliculas;
        expect(movie).to.include.keys('titulo', 'imagen', 'calificacion');
    })

    it('should return an error message when the movie title does not exist (GET /movies/:titulo/details)', async () => {
        let response = await myReq.get('/movies/El Planeta del Trabajo/details')
        expect(response.status).to.eql(404);

        const error = response.body.error;
        expect(error).to.eql('Pelicula no encontrada');
    })

    it('should update the movie with the given title (PUT /movie/:titulo)', async () => {
        const updatedMovie = {
            titulo: 'El Planeta del Treasure',
            imagen: 'no disponible',
            calificacion: 5
        }

        let update = await myReq.put('/movies/El Planeta del Tesoro').send(updatedMovie);
        expect(update.status).to.be.equal(201);
        expect(update.body.pelicula).to.eql(updatedMovie);
    })

    it('should return an error message when trying to update the movie with wrong movie format (PUT /movie/:titulo)', async () => {
        const updatedMovie = {
            titulo: 'El Planeta del Treasure',
            foto: 'no disponible',
            calificacion: 5
        }

        let update = await myReq.put('/movies/El Planeta del Tesoro').send(updatedMovie);
        expect(update.status).to.be.equal(404);
        expect(update.body.error).to.eql('Pelicula no encontrada o con formato erróneo');
    })

    it('should delete the movie with the given title (DELETE /movies/:titulo)', async () => {
        let allMovies = await myReq.get('/movies')
        let movieName = allMovies.body.peliculas[0].titulo;

        let deleted = await myReq.delete(`/movies/${movieName}`);
        allMovies = await myReq.get('/movies')

        expect(deleted.status).to.eql(200); 
        expect(allMovies.body.peliculas.length).to.eql(0);
    })

    it('should return an error message when trying to delete a movie that does not exist (DELETE /movies/:titulo)', async () => {
        let deleted = await myReq.delete(`/movies/El Planeta del Trabajo`);

        expect(deleted.status).to.eql(404); 
        expect(deleted.body.error).to.eql('Pelicula no encontrada')
    })
})