import { orderRepository } from '../repositories/order.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/errors.js';
import { config } from '../config/index.js';
import { ORDER_STATUS, DELIVERY_PRIORITY } from '../utils/constants.js';

// recibe todo por parámetro para poder testearla sin config ni DB
export const calculateShippingCost = ({ isProduction, shipmentValue, apiKey }) => {
  if (!apiKey) {
    throw new AppError('Configuración inválida: falta API Key', 500);
  }

  if (isProduction) {
    return 50 + shipmentValue * 0.01;
  }

  return 10;
};

export const orderService = {
  getOrders: async () => {
    return orderRepository.getAll();
  },

  getOrderById: async (id) => {
    const order = await orderRepository.getById(id);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    return order;
  },

  createOrder: async (newOrder) => {
    const customer = await userRepository.getById(newOrder.customer);
    if (!customer) {
      throw new AppError('El cliente especificado no existe', 400);
    }

    if (!newOrder.items || newOrder.items.length === 0) {
      throw new AppError('El pedido debe tener al menos un item', 400);
    }

    const itemsTotal = newOrder.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    const declaredValue = newOrder.declaredValue || itemsTotal;
    const shippingCost = calculateShippingCost({
      isProduction: config.isProd,
      shipmentValue: declaredValue,
      apiKey: config.jwtSecret
    });

    return orderRepository.create({
      ...newOrder,
      declaredValue,
      shippingCost,
      total: itemsTotal + shippingCost,
      status: ORDER_STATUS.CREATED,
      priority: newOrder.priority || DELIVERY_PRIORITY.NORMAL
    });
  },

  updateOrder: async (id, updates) => {
    const order = await orderRepository.update(id, updates);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    return order;
  },

  deleteOrder: async (id) => {
    const order = await orderRepository.delete(id);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    return order;
  }
};
