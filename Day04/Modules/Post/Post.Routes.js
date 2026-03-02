import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import authorize from "../../Middleware/authorize.js";
import { postModel } from "../../Database/Models/Post.model.js";
import { createPost, deletePost, getPosts, myPosts, updatedPost } from "./Post.Controller.js";

const postRoutes = express.Router();
postRoutes.use(verifyToken);

postRoutes.get("/posts", getPosts);
postRoutes.get("/myposts", myPosts);
postRoutes.post("/posts", createPost);
postRoutes.put("/posts/:id", authorize(postModel), updatedPost);   // ownership checked
postRoutes.delete("/posts/:id", authorize(postModel), deletePost); // ownership checked

export default postRoutes;