import express from "express";
import { signin, signup } from "./User.Controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPassword from "../../Middleware/hashPassword.js";


let userRoutes = express.Router();

userRoutes.post("/signup",checkEmail,hashPassword, signup);
userRoutes.post("/signin",checkEmail, signin)

export default userRoutes