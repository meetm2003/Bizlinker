const Joi = require("joi");

const messageValidator = Joi.object({
    senderId: Joi.string().required(),
    recieverId: Joi.string().required(),
    message: Joi.string().required(),
});

module.exports = { messageValidator };