import Delivery from "../models/delivery.model.js";

export const deliveryRepository = {

  getAll: async (filter = {}) => {
    return await Delivery.find(filter)
      .populate('order')
      .populate('driver', 'firstName lastName email');
  },

  getById: async (id) => {
    return await Delivery.findById(id)
      .populate('order')
      .populate('driver', 'firstName lastName email');
  },

  create: async (newDelivery) => {
    return await Delivery.create(newDelivery);
  },

  update: async (id, updates) => {
    return await Delivery.findByIdAndUpdate(id, updates, { new: true });
  },

  delete: async (id) => {
    return await Delivery.findByIdAndDelete(id);
  },

  insertMany: async (deliveries) =>{
    return await Delivery.insertMany(deliveries);
  }
}
