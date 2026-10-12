import User from "../models/user.model.js";

export const userRepository = {

    getAll: (filter = {}) => {
        return User.find(filter);
    },

    getById: (id) => {
        return User.findById(id);
    },

    getByEmail: (email) => {
        return User.findOne({ email });
    },

    create: (newUser) => {
        return User.create(newUser);
    },

    update: (id, updates) => {
        return User.findByIdAndUpdate(id, updates, { new: true });
    },

    delete: (id) => {
        return User.findByIdAndDelete(id);
    },

    insertMany: (users) =>{
        return User.insertMany(users);
    }
}
