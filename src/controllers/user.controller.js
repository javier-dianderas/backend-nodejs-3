import { userService } from '../services/user.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        successResponse(res, { message: "Lista de usuarios", payload: users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        successResponse(res, { message: "Usuario obtenido", payload: user });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        successResponse(res, { statusCode: 201, message: "Usuario creado", payload: user });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        successResponse(res, { message: "Usuario actualizado", payload: user });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        successResponse(res, { message: "Usuario eliminado", payload: user });
    } catch (error) {
        next(error);
    }
};
