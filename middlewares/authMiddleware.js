import jwt from "jsonwebtoken";
import "dotenv/config.js";
const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: 'Necesitas enviar un token válido'
      })
    }
    const token = authHeader.split(' ')[1] || authHeader;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Necesitas un token válido'
        })
      }
      req.user = decoded.data
      next()
    })
}
