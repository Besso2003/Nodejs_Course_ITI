import mongoose from "mongoose";

const authorize = (model) => {
    return async (req, res, next) => {
        try {
            let decoded = req.decoded;
            let id = req.params.commentId || req.params.id;

            if (!mongoose.isValidObjectId(id))
                return res.status(400).json({ message: "Invalid ID!" });

            let document = await model.findById(id);

            if (!document)
                return res.status(404).json({ message: "Document Not Found!" });

            if (document.createdBy.toString() !== decoded._id)
                return res.status(403).json({ message: "Not Authorized!" });

            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
};

export default authorize;