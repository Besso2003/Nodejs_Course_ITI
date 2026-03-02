import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"],
            trim: true
        },

        content: {
            type: String,
            required: [true, "Content is required"],
            minlength: [5, "Content must be at least 10 characters"]
        },

        author: {
            type: String,
            required: [true, "Author name is required"],
            minlength: [3, "Author name must be at least 3 characters"]
        }
    },
    {
        timestamps: true
    }
)

export const postModel = mongoose.model("Post", postSchema)