import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import authorize from "../../Middleware/authorize.js";
import { commentModel } from "../../Database/Models/Comment.Model.js";
import { createComment, deleteComment, getComments, getMyComments, updateComment } from "./Comment.controller.js";

const commentsRoutes = express.Router();

commentsRoutes.use(verifyToken);

commentsRoutes.get("/comments", getComments);
commentsRoutes.get("/mycomments", getMyComments);
commentsRoutes.post("/posts/:postId/comments", createComment);
commentsRoutes.put("/comments/:commentId", authorize(commentModel), updateComment);
commentsRoutes.delete("/comments/:commentId", authorize(commentModel), deleteComment);

export default commentsRoutes;