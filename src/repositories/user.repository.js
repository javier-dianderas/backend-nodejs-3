import User from "../models/user.model.js";

export const userRepository = {

    getAll: async (filter = {}) => {
        return await User.find(filter);
    },

    getById: async (id) => {
        return await User.findById(id);
    },

    getByEmail: async (email) => {
        return await User.findOne({ email });
    },

    create: async (newUser) => {
        return await User.create(newUser);
    },

    update: async (id, updates) => {
        return await User.findByIdAndUpdate(id, updates, { new: true });
    },

    delete: async (id) => {
        return await User.findByIdAndDelete(id);
    },

    insertMany: async (users) =>{
        return await User.insertMany(users);
    }
}
