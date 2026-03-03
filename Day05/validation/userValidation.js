
import Joi from "joi";


const userValidationSchema =  Joi.object({
    name: Joi.string().min(3).max(10).required().messages({
        "string.min": "Name must be at least 3 characters long _ From Note APP",
        "string.empty": "Name is required _ From Note APP",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid Email _ From Note APP",
    }),
    password: Joi.string().min(6).max(10).required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$')).messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number _ From Note APP",
    }), 
    age: Joi.number().integer().min(20).max(50).required().messages({
        "number.base": "Age must be a number _ From Note APP",
        "number.integer": "Age must be an integer _ From Note APP",
        "number.min": "Age must be at least 20 _ From Note APP",
        "number.max": "Age must be at most 50 _ From Note APP",
        "number.empty": "Age is required _ From Note APP",
    })
})


export default userValidationSchema