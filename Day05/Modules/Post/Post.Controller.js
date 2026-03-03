import { postModel } from "../../Database/Models/Post.model.js";
import catchError from "../../Middleware/catchError.js";

// Get all posts
const getPosts = catchError(async (req, res) => {
    const posts = await postModel
        .find()
        .populate("createdBy", "name email -_id");

    res.json({ message: "List Of Posts", data: posts });
});


// Get logged-in user's posts
const myPosts = catchError(async (req, res) => {
    const decoded = req.decoded;

    const posts = await postModel.find({
        createdBy: decoded._id
    });

    res.json({ message: "My Posts", data: posts });
});


// Create post
const createPost = catchError(async (req, res) => {
    const decoded = req.decoded;

    req.body.createdBy = decoded._id;

    const newPost = await postModel.create(req.body);

    res.status(201).json({
        message: "Post Created",
        data: newPost
    });
});


// Update post
const updatedPost = catchError(async (req, res) => {
    const id = req.params.id;

    const updatedPost = await postModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.json({
        message: "Post Updated",
        data: updatedPost
    });
});


// Delete post
const deletePost = catchError(async (req, res) => {
    const id = req.params.id;

    await postModel.findByIdAndDelete(id);

    res.json({ message: "Post Deleted" });
});


export { getPosts, createPost, myPosts, updatedPost, deletePost };