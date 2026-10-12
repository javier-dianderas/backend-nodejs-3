import { deliveryService } from '../services/delivery.service.js';

export const getDeliveries = async (req, res, next) => {
  try {
    const deliveries = await deliveryService.getDeliveries();
    res.json({ status: 'success', payload: deliveries });
  } catch (error) {
    next(error);
  }
};

export const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await deliveryService.getDeliveryById(req.params.id);
    res.json({ status: 'success', payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const createDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.createDelivery(req.body);
    res.status(201).json({ status: 'success', payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.updateDelivery(req.params.id, req.body);
    res.json({ status: 'success', payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const deleteDelivery = async (req, res, next) => {
  try {
    await deliveryService.deleteDelivery(req.params.id);
    res.json({ status: 'success', message: 'Entrega eliminada' });
  } catch (error) {
    next(error);
  }
};
