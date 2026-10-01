import { userRepository } from "../repositories/user.repository.js";
import { USER_ROLES } from "../utils/constants.js";

export const userService = {

    getUsers: async () => {
        return await userRepository.getAll();
    },

    getUserById: async (id) => {
        const user = await userRepository.getById(id);

        if(!user) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return user;
    },

    createUser: async (newUser) => {
        const { firstName, lastName, email, password, role = "user" } = newUser;

        if (!firstName || !lastName || !email || !password) {
            const error = new Error("Faltan campos obligatorios");
            error.statusCode = 400;
            throw error;
        }

        //falta comprobar si rol tiene un valor valido
        if(!Object.values(USER_ROLES).includes(role)) {
            const error = new Error("role tiene un valor inválido");
            error.statusCode = 400;
            throw error;
        }

        const existing = await userRepository.getByEmail(email);
        if(existing) {
            const error = new Error("Ya existe un usuario registrado con el email");
            error.statusCode = 400;
            throw error;
        }

        return await userRepository.create({ firstName, lastName, email, password, role });
    },

    updateUser: async (id, updateUser) => {
        const user = await userRepository.update(id, updateUser);

        if(!user) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return user;
    },

    deleteUser: async (id) => {
        const user = await userRepository.delete(id);

        if(!user) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return user;
    }

}