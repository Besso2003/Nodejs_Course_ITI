import { postModel } from "../../Database/Models/Post.model.js";
import mongoose from "mongoose";

const getPosts = async (req, res) => {
  try {
    let posts = await postModel.find();
    res.json({ message: "List Of Posts", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSinglePost = async (req, res) => {
    try {
        let id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        let post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Single Post", data: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
  try {
    let newPost = await postModel.create(req.body);
    res.status(201).json({ message: "Post Created", data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
    try {
        let id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        let updatedPost = await postModel.findByIdAndUpdate(id, req.body,{ new: true});

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post Updated", data: updatedPost });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        let id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        let deletedPost = await postModel.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post Deleted", data: deletedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getPosts, getSinglePost, createPost, updatePost, deletePost }