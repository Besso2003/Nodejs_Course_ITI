import { commentModel } from "../../Database/Models/Comment.Model.js";
import { postModel } from "../../Database/Models/Post.model.js";
import mongoose from "mongoose";

// Get all comments
const getComments = async (req, res) => {
    try {
        const comments = await commentModel
            .find()
            .populate("createdBy", "name email -_id")
            .populate("post", "title -_id");
        
        res.json({ message: "All Comments", data: comments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get logged-in user's comments
const getMyComments = async (req, res) => {
    try {
        const decoded = req.decoded;
        const comments = await commentModel
            .find({ createdBy: decoded._id })
            .populate("post", "title -_id");

        res.json({ message: "My Comments", data: comments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create comment by logged-in user
const createComment = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update comment by logged-in user (ownership checked by middleware)
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const updatedComment = await commentModel.findByIdAndUpdate(
            commentId,
            req.body,
            { new: true }
        );

        res.json({ message: "Comment Updated", data: updatedComment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete comment by logged-in user (ownership checked by middleware)
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        await commentModel.findByIdAndDelete(commentId);
        res.json({ message: "Comment Deleted Successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getComments, createComment, updateComment, deleteComment, getMyComments };