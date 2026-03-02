import { postModel } from "../../Database/Models/Post.model.js";
import mongoose from "mongoose";

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate("createdBy", "name email -_id");
        res.json({ message: "List Of Posts", data: posts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get logged-in user's posts
const myPosts = async (req, res) => {
    try {
        const decoded = req.decoded;
        const posts = await postModel.find({ createdBy: decoded._id });
        res.json({ message: "My Posts", data: posts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create post
const createPost = async (req, res) => {
    try {
        const decoded = req.decoded;
        req.body.createdBy = decoded._id;

        const newPost = await postModel.create(req.body);
        res.status(201).json({ message: "Post Created", data: newPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update post (ownership checked by middleware)
const updatedPost = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPost = await postModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: "Post Updated", data: updatedPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete post (ownership checked by middleware)
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await postModel.findByIdAndDelete(id);
        res.json({ message: "Post Deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getPosts, createPost, myPosts, updatedPost, deletePost };