class PeliculaService {
    constructor(repository) {
        this.repository = repository;
    }

    async getMovies(orderQuery, nameQuery, genreQuery) {
        const getQuery = () => {
            if (nameQuery[1]) {
                return nameQuery
            } else if (genreQuery[1]) {
                return genreQuery
            } else if (orderQuery[1]) {
                return orderQuery
            } else {
                return false;
            }
        }
        return this.repository.getMovies(getQuery());
    }

    async movieDetails(peliculaId) {
        return this.repository.movieDetails(peliculaId);
    }

    async createMovie(movie) {
        return this.repository.createMovie(movie);
    }

    async updateMovie(peliculaMod, peliculaId) {
        const isModified = await this.repository.updateMovie(peliculaMod, peliculaId)
        return isModified;
    }

    async deleteMovie(pelicula) {
        const isDeleted = await this.repository.deleteMovie(pelicula)
        return isDeleted;
    }

}

export default PeliculaService;