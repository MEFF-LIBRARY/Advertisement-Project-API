import { productModel } from "../models/product.js";
import { UserModel } from "../models/user.js";

import { postProductValidator, updateProductValidator } from "../validators/products.js";

export const postProduct = async (req, res, next) => {
    try {

        // validate user input
        const { error, value } = postProductValidator.validate({
            ...req.body,
            images: req.file?.filename
        });

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const products = await productModel.create(value)
        res.status(201).json(`Product: ${products.productName} has been added successfully`)

    } catch (error) {
        next(error)
    }
}

export const getProducts = async (req, res, next) => {
    try {

        const { filter = "{}" } = req.query

        // user can seach by keyword. Yet to figure out how user can find by category.
        const product = await productModel.find(JSON.parse(filter))
        res.json(product);

    } catch (error) {
        next(error)
    }
}

export const updateProducts = async (req, res, next) => {
    try {
        // validate user input
        const { error, value } = updateProductValidator.validate({
            ...req.body,
            images: req.file?.filename
        });

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        const products = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({message: 'Product modified successfully'})
    } catch (error) {
        next(error)
    }
}

export const deleteProducts = async (req, res, next) => {
    try {

        const products = await productModel.findByIdAndDelete(req.params.id, req.body)
        res.status(200).json(`Product: ${products.productName} has been deleted successfully`)

    } catch (error) {
        next(error)
    }
}

