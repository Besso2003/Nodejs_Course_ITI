import express from "express";
import { signin, signup, verifyAccount } from "./User.Controller.js";
import checkEmail from "../../Middleware/checkEmail.js";
import hashPassword from "../../Middleware/hashPassword.js";
import { validationMiddleware } from "../../Middleware/validationMiddleware.js";
import userValidationSchema from "../../validation/userValidation.js";

let userRoutes = express.Router();

userRoutes.post("/signup",validationMiddleware(userValidationSchema),checkEmail,hashPassword, signup);
userRoutes.post("/signin",checkEmail, signin)
userRoutes.get("/verify/:email", verifyAccount)

export default userRoutes