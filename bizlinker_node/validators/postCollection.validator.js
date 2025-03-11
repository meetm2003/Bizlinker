const Joi = require("joi");

const postValidationSchema = Joi.object({
    userId: Joi.string().required(),
    caption: Joi.string().trim().required(),
    image: Joi.string().optional(),
    video: Joi.string().optional(),
    location: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    visibility: Joi.string().valid("public", "private", "friends").default("public"),
});

const commentValidationSchema = Joi.object({
    userId: Joi.string().required(),
    text: Joi.string().min(1).max(500).required(),
    createdAt: Joi.date().default(Date.now),
});

module.exports = { postValidationSchema, commentValidationSchema };