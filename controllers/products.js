import { productModel } from "../models/product.js";

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

        // if both are provided, we return a message
        if (value.discountPrice && value.discountPercentage) {
            return res.status(400).json({ message: 'Please provide either discount or discounted price, not both' });
        }

        // if discount price is provided but discount percentage is not provided, calculate discount percentage instead
        if (value.discountPrice && !value.discountPercentage) {
            value.discountPercentage = ((value.price - value.discountPrice) / value.price) * 100;
        }

        // if discount percentage is provided but discount price is not provided, calculate discount instead
        if (!value.discountPrice && value.discountPercentage) {
            value.discountPrice = value.price - (value.price * (value.discountPercentage / 100));
        }
        // if none is provided, maintain price 
        if (!value.discountPrice && !value.discountPercentage) {
            value.discountPrice = undefined;
        }        // nb: only discount percentage and discount price get modified, price is not modified


        const products = await productModel.create({ ...value, user: req.auth.id })  //assign id to vendor upon request so we know who posted the ad
        res.status(201).json(`Product: ${products.productName} has been added successfully`)

    } catch (error) {
        next(error)
    }
}

export const getProducts = async (req, res, next) => {
    try {

        const { filter = "{}", sort = "{}" } = req.query

        // user can seach by keyword. Yet to figure out how user can find by category.
        const product = await productModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .populate('user', '-password -_id')
        res.json(product);

    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req, res, next) => {
    try {
        // user can seach by keyword. Yet to figure out how user can find by category.
        const product = await productModel
            .findById(req.params.id)
            .populate('user', '-password -_id')
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

        // if both are provided, we return a message
        if (value.discountPrice && value.discountPercentage) {
            return res.status(400).json({ message: 'Please provide either discount or discounted price, not both' });
        }

        // if discount price is provided but discount percentage is not provided, calculate discount percentage instead
        if (value.discountPrice && !value.discountPercentage) {
            value.discountPercentage = ((value.price - value.discountPrice) / value.price) * 100;
        }

        // if discount percentage is provided but discount price is not provided, calculate discount instead
        if (!value.discountPrice && value.discountPercentage) {
            value.discountPrice = value.price - (value.price * (value.discountPercentage / 100));
        }
        // if none is provided, it means there's no discount so maintain price 
        if (!value.discountPrice && !value.discountPercentage) {
            value.discountPrice = undefined;
        }

        const products = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({ message: 'Product modified successfully' })
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

// count number of products. 
export const countProducts = async (req, res, next) => {
    try {

        // not sure why the filter tho
        const { filter = "{}" } = req.query;

        const count = await productModel.countDocuments(JSON.parse(filter))
        res.json({ count });

    } catch (error) {
        next(error)
    }
}