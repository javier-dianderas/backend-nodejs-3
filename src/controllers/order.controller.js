import { orderService } from '../services/order.service.js';

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    res.json({ status: 'success', payload: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json({ status: 'success', payload: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ status: 'success', payload: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    res.json({ status: 'success', payload: order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.json({ status: 'success', message: 'Pedido eliminado' });
  } catch (error) {
    next(error);
  }
};
