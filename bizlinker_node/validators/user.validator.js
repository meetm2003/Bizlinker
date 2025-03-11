const Joi = require("joi");

const registerUserValidator = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Name is required",
    }),
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Phone number must be 10 digits",
        "string.empty": "Phone is required",
    }),
    passwordHash: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 6 characters",
        "string.empty": "Password is required",
    }),
    role: Joi.string().trim().valid("business_owner", "user", "admin").required().messages({
        "any.only": "Role must be one of: business_owner, user, admin",
        "string.empty": "Role is required",
    }),
    dob: Joi.date().required().messages({
        "date.base": "Invalid date format",
        "any.required": "Date of birth is required",
    }),
    profilePic: Joi.string().trim().required().messages({
        "string.empty": "Profile pic is required",
    }),
    skills: Joi.array().items(Joi.string()).min(1).required().messages({
        "array.base": "Skills must be an array",
        "array.min": "At least one skill is required",
    }),
});

const loginUserValidator = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 charachters",
        "string.empty": "Password is required",
    }),
});

module.exports = { registerUserValidator, loginUserValidator };