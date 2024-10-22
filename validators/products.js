import Joi from "joi";
export const postProductValidator = Joi.object({
productName: Joi.string().required(),
description: Joi.string(),
category: Joi.string(),
images: Joi.string().required(), //issue uploading when i make image required
price: Joi.number().required(),
discountedPrice: Joi.number(),
discountPercentage: Joi.number()
});

export const updateProductValidator = Joi.object({
productName: Joi.string(),
description: Joi.string(),
categoryId: Joi.object(),
images: Joi.string(),
price: Joi.number(),
discountedPrice: Joi.number(),
discountPercentage: Joi.number()
});