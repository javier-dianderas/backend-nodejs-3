import { deliveryRepository } from '../repositories/delivery.repository.js';
import { orderRepository } from '../repositories/order.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { USER_ROLES } from '../utils/constants.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
import { createError } from '../utils/apiResponse.js';
import logger from '../config/logger.js';

export const deliveryService = {
  getDeliveries: async () => {
    return await deliveryRepository.getAll();
  },

  getDeliveryById: async (id) => {
    const delivery = await deliveryRepository.getById(id);

    if (!delivery) {
      throw createError(ERROR_CODES.DELIVERY_NOT_FOUND);
    }

    return delivery;
  },

  createDelivery: async (newDelivery) => {
    const order = await orderRepository.getById(newDelivery.order);
    if (!order) {
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    if (newDelivery.driver) {
      const driver = await userRepository.getById(newDelivery.driver);
      if (!driver) {
        throw createError(ERROR_CODES.DRIVER_NOT_FOUND);
      }
      if (driver.role !== USER_ROLES.DRIVER) {
        throw createError(ERROR_CODES.USER_IS_NOT_DRIVER);
      }
    }

    const deliveryCreated = await deliveryRepository.create(newDelivery);
    logger.info(`Se creó la entrega con id ${deliveryCreated._id}`);
    return deliveryCreated;
  },

  updateDelivery: async (id, updates) => {
    const delivery = await deliveryRepository.update(id, updates);

    if (!delivery) {
      throw createError(ERROR_CODES.DELIVERY_NOT_FOUND);
    }

    logger.info(`Se actualizó la entrega con id ${delivery._id}`);
    return delivery;
  },

  deleteDelivery: async (id) => {
    const delivery = await deliveryRepository.delete(id);

    if (!delivery) {
      throw createError(ERROR_CODES.DELIVERY_NOT_FOUND);
    }
    logger.info(`Se eliminó la entrega con id ${delivery._id}`);
    return delivery;
  }
};
