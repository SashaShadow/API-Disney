import express from "express";
import { register } from "../controllers/registerController.js";
import { login } from "../controllers/loginController.js";
import "dotenv/config.js";
const { Router } = express;
const authRouter = Router()

export default authRouter;

authRouter.post('/register', register);
authRouter.post('/login', login);