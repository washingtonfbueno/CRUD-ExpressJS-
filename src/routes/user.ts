import express, { NextFunction, Request, Response } from "express";

import { validateUser } from "../middlewares/validateUser";
import { loginUser, registerUser } from "../controllers/userController";
import { authenticateUser } from "../middlewares/authenticateUser";

const user = express.Router();

user.post("/register", validateUser, registerUser);

user.post("/login", loginUser);

export default user;
