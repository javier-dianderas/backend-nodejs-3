import { mockService } from "../services/mocks.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getMockUsers = (req, res, next) => {
    try{
        const users = mockService.getMockUsers(req.query.qty);
        successResponse(res, { message: "Mock de usuarios", payload: users });
    }catch(error){
        next(error);
    }
}

export const getMockOrders = (req, res, next) => {
    try {
        const orders = mockService.getMockOrders(req.query.qty);
        successResponse(res, { message: "Mock de ordenes", payload: orders });
    } catch (error) {
        next(error);
    }
}

export const getMockDeliveries = (req, res, next) => {
    try {
        const deliveries = mockService.getMockDeliveries(req.query.qty);
        successResponse(res, { message: "Mock de entregas", payload: deliveries });
    } catch (error) {
        next(error);
    }
}

export const getMockStores = (req, res, next) => {
    try {
        const stores = mockService.getMockStores(req.query.qty);
        successResponse(res, { message: "Mock de comercios", payload: stores });
    } catch (error) {
        next(error);
    }
}

export const seed = async (req, res, next) => {
    try{
        const qty = req.query.qty ?? req.body?.qty
        const inserted = await mockService.seed(qty)        
        successResponse(res, { statusCode: 201, message: "Seed de entidades", payload: inserted });
    }catch(error){
        next(error)
    }
}