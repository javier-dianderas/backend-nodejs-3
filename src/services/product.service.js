import { productRepository } from "../repositories/product.repository.js";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { config } from "../config/index.js";
import { emailProvider } from "./mail.service.js";

export const productService = {

    getProductsByFilter: async (all) => {
        const products = await productRepository.getAll();

        if(all === "true") {
            return products;
        } 
        
        const availableProducts = products.filter((product) => {
            return product.stock > 0 && product.status === PRODUCT_STATUS.AVAILABLE;
        });
        return availableProducts;        
    },

    getProductById: async (id) => {
        const product = await productRepository.getById(id);

        if(!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return product;
    },

    getProductShippingCostById: async (id) => {
        const product = await productRepository.getById(id);

        if(!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }

        if(!config.shippingApiKey) {
            const error = new Error("Falta API key");
            error.statusCode = 500;
            throw error;
        }

        const shippingCost = config.isProd ? 50 + product.price * 0.01 : 10;
        const productShippingCost = { product: product._id, declaredValue: product.price, shippingCost };
        return productShippingCost;
    },

    createProduct: async (newProduct) => {
        const { title, code, price, stock = 0 } = newProduct;

        if (!title || !code || price === undefined) {
            const error = new Error("Faltan campos obligatorios");
            error.statusCode = 400;
            throw error;
        }

        if (price < 0) {
            const error = new Error("Precio inválido");
            error.statusCode = 400;
            throw error;
        }

        const existing = await productRepository.getByCode(code);
        if(existing) {
            const error = new Error("Ya existe un producto registrado con el code");
            error.statusCode = 400;
            throw error;
        }

        const createdProduct = await productRepository.create({
            title,
            code,
            price,
            stock,
            status: stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK
        });
        
        await emailProvider.send('Producto creado: ' + createdProduct.title);

        return createdProduct;
    },

    updateProduct: async (id, updateProduct) => {
        const { title, code, description, price, stock, category } = updateProduct;

        const status = stock !== undefined && stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;        

        const product = await productRepository.update(id, { title, code, description, price, stock, category, status });

        if(!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return product;
    },

    deleteProduct: async (id) => {
        const product = await productRepository.delete(id);

        if(!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return product;
    }

}