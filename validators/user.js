import Joi from "joi";

export const registerUserValidator = Joi.object({
    avatar: Joi.string(),
    userName: Joi.string().required(),
    businessName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.number().required(),
    role: Joi.string().valid('user', 'vendor', 'admin', 'superadmin')
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const updateUserValidator = Joi.object({
    userName: Joi.string(),
    avatar: Joi.string()
});