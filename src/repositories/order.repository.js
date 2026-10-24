import Order from "../models/order.model.js";

export const orderRepository = {

  getAll: async (filter = {}) => {
    return await Order.find(filter)
      .populate('customer', 'firstName lastName email')
      .populate('delivery');
  },

  getById: async (id) => {
    return await Order.findById(id)
      .populate('customer', 'firstName lastName email')
      .populate('delivery');
  },

  create: async (newOrder) => {
    return await Order.create(newOrder);
  },

  update: async (id, updates) => {
    return await Order.findByIdAndUpdate(id, updates, { new: true });
  },

  delete: async (id) => {
    return await Order.findByIdAndDelete(id);
  },

  insertMany: async (orders) =>{
    return await Order.insertMany(orders);
  }
}
