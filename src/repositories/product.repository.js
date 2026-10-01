import Product from "../models/product.model.js";

export const productRepository = {

    getAll: async () => {
        return await Product.find();
    },

    getById: async (id) => {
        return await Product.findById(id);
    },

    getByCode: async (code) => {
        return await Product.findOne({ code });
    },
    
    create: async (newProduct) => {
        return await Product.create(newProduct);
    },

    update: async (id, updateProduct) => {
        return await Product.findByIdAndUpdate(id, updateProduct, { new: true });
    },

    delete: async (id) => {
        return await Product.findByIdAndDelete(id);
    }
}