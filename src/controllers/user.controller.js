import { userService } from '../services/user.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { unlink } from "node:fs/promises";

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

export const uploadUserDocument = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const type = req.body.type;
        const file = req.file;

        const user = await userService.addDocument(id, file, type);

        successResponse(res, {
            statusCode: 200,
            message: "Documento agregado correctamente",
            payload: user
        });
    } catch (error) {
        if(req.file) {
            await unlink(req.file.path);
        }
        next(error);
    }
}
