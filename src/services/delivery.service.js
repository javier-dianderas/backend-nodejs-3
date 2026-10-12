import { deliveryRepository } from '../repositories/delivery.repository.js';
import { orderRepository } from '../repositories/order.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/errors.js';
import { USER_ROLES } from '../utils/constants.js';

export const deliveryService = {
  getDeliveries: async () => {
    return deliveryRepository.getAll();
  },

  getDeliveryById: async (id) => {
    const delivery = await deliveryRepository.getById(id);

    if (!delivery) {
      throw new AppError('Entrega no encontrada', 404);
    }

    return delivery;
  },

  createDelivery: async (newDelivery) => {
    const order = await orderRepository.getById(newDelivery.order);
    if (!order) {
      throw new AppError('El pedido especificado no existe', 400);
    }

    if (newDelivery.driver) {
      const driver = await userRepository.getById(newDelivery.driver);
      if (!driver) {
        throw new AppError('El repartidor especificado no existe', 400);
      }
      if (driver.role !== USER_ROLES.DRIVER) {
        throw new AppError('El usuario no es driver', 400);
      }
    }

    return deliveryRepository.create(newDelivery);
  },

  updateDelivery: async (id, updates) => {
    const delivery = await deliveryRepository.update(id, updates);

    if (!delivery) {
      throw new AppError('Entrega no encontrada', 404);
    }

    return delivery;
  },

  deleteDelivery: async (id) => {
    const delivery = await deliveryRepository.delete(id);

    if (!delivery) {
      throw new AppError('Entrega no encontrada', 404);
    }

    return delivery;
  }
};
