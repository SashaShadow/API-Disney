import jwt from "jsonwebtoken";
import Usuario from "../dbmodels/user.model.js";
import { msg, sendMail } from "../utils/sendgridMail.js";
import { createHash } from '../utils/crypt.js';
import "dotenv/config.js";

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = user => {
    const token = jwt.sign({data: user}, SECRET_KEY, {expiresIn: '24h'});
    return token
}

export const register = async (req, res) => {

    const { username, password, email } = req.body;
    const userExists = await Usuario.findOne({where: {nombre: username}})

    if (userExists) {
        return res.json({ error: 'El nombre de usuario ya esta en uso' })
      }
    
    const hashedPassword = createHash(password);
    const user = { nombre: username, contraseña: hashedPassword, email: email };
    await Usuario.create(user);
    
    await sendMail(msg(user));  

    const access_token = generateToken(user)
    return res.json({ user, access_token })
     
}