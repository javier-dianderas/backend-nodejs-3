import Delivery from "../models/delivery.model.js";

export const deliveryRepository = {

  getAll: (filter = {}) => {
    return Delivery.find(filter)
      .populate('order')
      .populate('driver', 'firstName lastName email');
  },

  getById: (id) => {
    return Delivery.findById(id)
      .populate('order')
      .populate('driver', 'firstName lastName email');
  },

  create: (newDelivery) => {
    return Delivery.create(newDelivery);
  },

  update: (id, updates) => {
    return Delivery.findByIdAndUpdate(id, updates, { new: true });
  },

  delete: (id) => {
    return Delivery.findByIdAndDelete(id);
  },

  insertMany: (deliveries) =>{
    return Delivery.insertMany(deliveries);
  }
}
