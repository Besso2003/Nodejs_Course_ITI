import mongoose from "mongoose";

export const connection = mongoose.connect("mongodb://127.0.0.1:27017/node_ITI")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));