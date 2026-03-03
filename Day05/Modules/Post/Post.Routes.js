import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import authorize from "../../Middleware/authorize.js";
import { validationMiddleware } from "../../Middleware/validationMiddleware.js";
import postValidationSchema from "../../validation/postValidation.js"
import { postModel } from "../../Database/Models/Post.model.js";
import { createPost, deletePost, getPosts, myPosts, updatedPost } from "./Post.Controller.js";

const postRoutes = express.Router();
postRoutes.use(verifyToken);

postRoutes.get("/posts", getPosts);
postRoutes.get("/myposts", myPosts);
postRoutes.post("/posts", validationMiddleware(postValidationSchema),createPost);
postRoutes.put("/posts/:id", validationMiddleware(postValidationSchema),authorize(postModel), updatedPost);
postRoutes.delete("/posts/:id", authorize(postModel), deletePost);

export default postRoutes;