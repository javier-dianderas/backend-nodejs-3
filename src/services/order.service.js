import { orderRepository } from '../repositories/order.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { config } from '../config/index.js';
import { ORDER_STATUS, DELIVERY_PRIORITY } from '../utils/constants.js';
import { createError } from '../utils/apiResponse.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';

// recibe todo por parámetro para poder testearla sin config ni DB
export const calculateShippingCost = ({ isProduction, shipmentValue, apiKey }) => {
  if (!apiKey) {
    throw createError(ERROR_CODES.INVALID_ORDER_API_KEY);
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
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    return order;
  },

  createOrder: async (newOrder) => {
    const customer = await userRepository.getById(newOrder.customer);
    if (!customer) {
      throw createError(ERROR_CODES.CUSTOMER_NOT_FOUND);
    }

    if (!newOrder.items || newOrder.items.length === 0) {
      throw createError(ERROR_CODES.ORDER_MUST_HAVE_ONE_ITEM);
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
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    return order;
  },

  deleteOrder: async (id) => {
    const order = await orderRepository.delete(id);

    if (!order) {
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    return order;
  }
};
