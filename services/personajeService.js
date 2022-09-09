class PersonajeService {
    constructor(repository) {
        this.repository = repository;
    }

    async getCharacters(nameQuery, ageQuery, movieQuery) {
        const getQuery = () => {
            if (nameQuery[1]) {
                return nameQuery
            } else if (ageQuery[1]) {
                return ageQuery
            } else if (movieQuery[1]) {
                return movieQuery
            } else {
                return false;
            }
        }

        return this.repository.getCharacters(getQuery());
    }

    async characterDetails(personajeId) {
        return this.repository.characterDetails(personajeId);
    }

    async createCharacter(personaje) {
        return this.repository.createCharacter(personaje);
    }

    async updateCharacter(personajeMod, personajeId) {
        const isModified = await this.repository.updateCharacter(personajeMod, personajeId)
        return isModified;
    }

    async deleteCharacter(personaje) {
        const isDeleted = await this.repository.deleteCharacter(personaje)
        return isDeleted;
    }

}

export default PersonajeService;