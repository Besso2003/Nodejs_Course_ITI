import { commentModel } from "../../Database/Models/Comment.Model.js";
import { postModel } from "../../Database/Models/Post.model.js";
import mongoose from "mongoose";
import catchError from "../../Middleware/catchError.js";

// Get all comments
const getComments = catchError(async (req, res) => {
    const comments = await commentModel
        .find()
        .populate("createdBy", "name email -_id")
        .populate("post", "title -_id");

    res.json({ message: "All Comments", data: comments });
});


// Get logged-in user's comments
const getMyComments = catchError(async (req, res) => {
    const decoded = req.decoded;
    const comments = await commentModel
        .find({ createdBy: decoded._id })
        .populate("post", "title -_id");

    res.json({ message: "My Comments", data: comments });
});


// Create comment by logged-in user
const createComment = catchError(async (req, res) => {
    const decoded = req.decoded;
    const { content } = req.body;
    const { postId } = req.params;

    if (!mongoose.isValidObjectId(postId))
        return res.status(400).json({ message: "Invalid Post ID!" });

    const foundPost = await postModel.findById(postId);
    if (!foundPost)
        return res.status(404).json({ message: "Post Not Found!" });

    const newComment = await commentModel.create({
        content,
        post: postId,
        createdBy: decoded._id
    });

    res.status(201).json({ message: "Comment Created", data: newComment });
});


// Update comment by logged-in user (ownership checked by middleware)
const updateComment = catchError(async (req, res) => {
    const commentId = req.params.commentId;

    const updatedComment = await commentModel.findByIdAndUpdate(
        commentId,
        req.body,
        { new: true }
    );

    res.json({ message: "Comment Updated", data: updatedComment });
});


// Delete comment by logged-in user (ownership checked by middleware)
const deleteComment = catchError(async (req, res) => {
    const commentId = req.params.commentId;

    await commentModel.findByIdAndDelete(commentId);

    res.json({ message: "Comment Deleted Successfully!" });
});


export { getComments, createComment, updateComment, deleteComment, getMyComments };