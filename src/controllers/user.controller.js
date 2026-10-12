import { userService } from '../services/user.service.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json({ status: 'success', payload: users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ status: 'success', payload: user });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ status: 'success', payload: user });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json({ status: 'success', payload: user });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ status: 'success', message: 'Usuario eliminado' });
    } catch (error) {
        next(error);
    }
};
