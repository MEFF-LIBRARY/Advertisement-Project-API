import { Router } from "express";
import { postProduct, getProducts, updateProducts, deleteProducts, countProducts } from "../controllers/products.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { productsUpload } from "../middlewares/upload.js";

export const productRouter = Router()

productRouter.post('/products', isAuthenticated, hasPermission('add_product'), productsUpload.single('images'), postProduct)

productRouter.get('/products', getProducts)

productRouter.patch('/products/:id', isAuthenticated, hasPermission('update_product'), productsUpload.single('images'), updateProducts)

productRouter.delete('/products/:id', isAuthenticated, hasPermission('delete_product'), deleteProducts)

productRouter.get('/products/count', countProducts)

