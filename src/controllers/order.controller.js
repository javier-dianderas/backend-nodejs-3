import { orderService } from '../services/order.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    successResponse(res, { message: "Lista de ordenes", payload: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    successResponse(res, { message: "Orden obtenida", payload: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    successResponse(res, { statusCode: 201, message: "Orden creada", payload: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    successResponse(res, { message: "Orden actualizada", payload: order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    successResponse(res, { message: "Orden eliminada", payload: order });
  } catch (error) {
    next(error);
  }
};
