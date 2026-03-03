import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content Is Required!"],
            minlength: [3, "Comment Must Be At Least 3 Characters!"]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const commentModel = mongoose.model("Comment", commentSchema);