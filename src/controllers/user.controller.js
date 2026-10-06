import { userService } from "../services/user.service.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();        
        res.status(200).json(users);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);        
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);        
        res.status(201).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);        
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);        
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message || 'Error del servidor');
    }
}