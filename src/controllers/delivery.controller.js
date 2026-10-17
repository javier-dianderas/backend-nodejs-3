import { deliveryService } from '../services/delivery.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getDeliveries = async (req, res, next) => {
  try {
    const deliveries = await deliveryService.getDeliveries();
    successResponse(res, { message: "Lista de entregas", payload: deliveries });
  } catch (error) {
    next(error);
  }
};

export const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await deliveryService.getDeliveryById(req.params.id);
    successResponse(res, { message: "Entrega obtenida", payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const createDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.createDelivery(req.body);    
    successResponse(res, { statusCode: 201, message: "Entrega creada", payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.updateDelivery(req.params.id, req.body);
    successResponse(res, { message: "Entrega actualizada", payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const deleteDelivery = async (req, res, next) => {
  try {
    const delivery = await deliveryService.deleteDelivery(req.params.id);
    successResponse(res, { message: "Entrega eliminada", payload: delivery });
  } catch (error) {
    next(error);
  }
};
