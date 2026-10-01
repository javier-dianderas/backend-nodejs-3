import User from "../models/user.model.js";

export const userRepository = {

    getAll: async () => {
        return await User.find();
    },

    getById: async (id) => {
        return await User.findById(id);
    },

    getByEmail: async (email) => {
        return await User.findOne({ email })
    },

    create: async (newUser) => {
        return await User.create(newUser);
    },

    update: async (id, updateUser) => {
        return await User.findByIdAndUpdate(id, updateUser, { new: true })
    },

    delete: async (id) => {
        return await User.findByIdAndDelete(id);
    }

}