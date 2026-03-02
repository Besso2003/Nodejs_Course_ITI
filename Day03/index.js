import express from "express";
import { connection } from "./Database/dbConnect.js";
import postRoutes from "./Modules/Post/Post.routes.js";

const app = express();
app.use(express.json())
connection;
app.use(postRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});