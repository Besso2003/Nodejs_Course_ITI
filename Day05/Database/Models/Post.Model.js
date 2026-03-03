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

        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const postModel = mongoose.model("Post", postSchema)