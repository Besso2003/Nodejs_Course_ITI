import mongoose from "mongoose";

export const dbConnect = mongoose.connect("mongodb://127.0.0.1:27017/node_Day4_ITI")
.then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
})