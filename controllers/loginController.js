import jwt from "jsonwebtoken";
import Usuario from "../dbmodels/user.model.js";
import { isValidPassword } from '../utils/crypt.js';

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = user => {
    const token = jwt.sign({data: user}, SECRET_KEY, {expiresIn: '24h'});
    return token
}

export const login = async (req, res) => {
    
    const { username, password } = req.body;

    const authUser = await Usuario.findOne({where: {nombre: username}})

    if (!authUser) {
        return res.json({error: 'Usuario inexistente'})
    } 

    const passwordIsOk = isValidPassword(authUser.contraseña, password);

    if (!passwordIsOk) {
        return res.json({ error: 'Contraseña incorrecta'})
    } else {
        const access_token = generateToken(authUser);
        res.json({ authUser, access_token })
    }
}