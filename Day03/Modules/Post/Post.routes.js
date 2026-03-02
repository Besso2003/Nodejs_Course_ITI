import express from "express";
import { createPost, deletePost, getPosts, getSinglePost, updatePost } from "./Post.controller.js";

const postRoutes = express.Router();

postRoutes.get("/posts", getPosts)
postRoutes.get("/posts/:id", getSinglePost)
postRoutes.post("/posts", createPost)
postRoutes.put("/posts/:id", updatePost)
postRoutes.delete("/posts/:id", deletePost)

export default postRoutes