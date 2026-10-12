import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/errors.js';
import { USER_ROLES } from '../utils/constants.js';

export const userService = {
    getUsers: async () => {
        return userRepository.getAll();
    },

    getUserById: async (id) => {
        const user = await userRepository.getById(id);

        if (!user) {
        throw new AppError('Usuario no encontrado', 404);
        }

        return user;
    },

    createUser: async (newUser) => {
        const { firstName, lastName, email, password, role = USER_ROLES.CUSTOMER } = newUser;

        if (!firstName || !lastName || !email || !password) {
        throw new AppError('Faltan campos obligatorios', 400);
        }

        if (!Object.values(USER_ROLES).includes(role)) {
        throw new AppError('Rol inválido', 400);
        }

        if (role === USER_ROLES.ADMIN) {
        throw new AppError('No se puede crear un admin desde este endpoint', 403);
        }

        const existing = await userRepository.getByEmail(email);
        if (existing) {
        throw new AppError('Ya existe un usuario con ese email', 400);
        }

        return userRepository.create({ firstName, lastName, email, password, role });
    },

    updateUser: async (id, updates) => {
        const user = await userRepository.update(id, updates);

        if (!user) {
        throw new AppError('Usuario no encontrado', 404);
        }

        return user;
    },

    deleteUser: async (id) => {
        const user = await userRepository.delete(id);

        if (!user) {
        throw new AppError('Usuario no encontrado', 404);
        }

        return user;
    }
};
