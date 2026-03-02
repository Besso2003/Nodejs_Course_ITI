import express from "express";
import { dbConnect } from "./Database/dbConnect.js";
import userRoutes from "./Modules/User/User.Routes.js";
import postRoutes from "./Modules/Post/Post.Routes.js";
import commentsRoutes from "./Modules/Comment/Comment.Routes.js";

const app = express();

dbConnect;

app.use(express.json());

app.use(userRoutes)
app.use(postRoutes)
app.use(commentsRoutes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});