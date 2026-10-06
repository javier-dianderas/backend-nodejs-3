import { productService } from "../services/product.service.js";

export const getProductsByFilter = async (req, res) => {
    try {
        const products = await productService.getProductsByFilter(req.query.all);        
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');  
    }
}

export const getProductShippingCostById = async (req, res) => {
    try {
        const product = await productService.getProductShippingCostById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');  
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}