import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connection = mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));