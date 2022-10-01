
export const createCharaMiddleware = () => {
    return (req, res, next) => {
        const personaje = req.body;

        if (personaje.nombre && personaje.imagen && personaje.edad && personaje.peso && personaje.historia) {
            if (personaje.pelicula) {
                if (typeof personaje.pelicula === 'string') {
                    return next();
                } else {
                    res.status(400).json({error: 'Escribe la película como texto (string)'})
                }
            }
            next()
        } else {
            res.status(400).json({error: 'parametros incorrectos'})
        }
    }
}