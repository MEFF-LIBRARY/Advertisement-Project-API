import Joi from "joi";
export const postProductValidator = Joi.object({
productName: Joi.string().required(),
description: Joi.string(),
categoryId: Joi.object(),
images: Joi.string().required(), //issue uploading when i make image required
price: Joi.number().required(),
});

export const updateProductValidator = Joi.object({
productName: Joi.string(),
description: Joi.string(),
categoryId: Joi.object(),
images: Joi.string(),
price: Joi.number()
});