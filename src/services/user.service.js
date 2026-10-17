import { userRepository } from '../repositories/user.repository.js';
import { USER_ROLES } from '../utils/constants.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
import { createError } from '../utils/apiResponse.js';

export const userService = {
    getUsers: async () => {
        return userRepository.getAll();
    },

    getUserById: async (id) => {
        const user = await userRepository.getById(id);

        if (!user) {
            throw createError(ERROR_CODES.USER_NOT_FOUND);
        }

        return user;
    },

    createUser: async (newUser) => {
        const { firstName, lastName, email, password, role = USER_ROLES.CUSTOMER } = newUser;

        if (!firstName || !lastName || !email || !password) {
            throw createError(ERROR_CODES.VALIDATION_ERROR);
        }

        if (role && !Object.values(USER_ROLES).includes(role)) {
            throw createError(ERROR_CODES.INVALID_USER_ROLE);
        }

        if (role === USER_ROLES.ADMIN) {
            throw createError(ERROR_CODES.FORBIDDEN_CREATE_ADMIN_ROLE);
        }

        const existing = await userRepository.getByEmail(email);
        if (existing) {
            throw createError(ERROR_CODES.USER_EXISTS_WITH_EMAIL);
        }

        return userRepository.create({ firstName, lastName, email, password, role });
    },

    updateUser: async (id, updates) => {
        const user = await userRepository.update(id, updates);

        if (!user) {
            throw createError(ERROR_CODES.USER_NOT_FOUND);
        }

        return user;
    },

    deleteUser: async (id) => {
        const user = await userRepository.delete(id);

        if (!user) {
            throw createError(ERROR_CODES.USER_NOT_FOUND);
        }

        return user;
    }
};
