import Joi from "joi";

const postValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        "string.min": "Title must be at least 3 characters long _ From Note APP",
        "string.max": "Title must be at most 100 characters long _ From Note APP",
        "string.empty": "Title is required _ From Note APP",
    }),
    content: Joi.string().min(5).max(1000).required().messages({
        "string.min": "Content must be at least 5 characters long _ From Note APP",
        "string.max": "Content must be at most 1000 characters long _ From Note APP",
        "string.empty": "Content is required _ From Note APP",
    }),
});

export default postValidationSchema;