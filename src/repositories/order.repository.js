import Order from "../models/order.model.js";

export const orderRepository = {

  getAll: (filter = {}) => {
    return Order.find(filter)
      .populate('customer', 'firstName lastName email')
      .populate('delivery');
  },

  getById: (id) => {
    return Order.findById(id)
      .populate('customer', 'firstName lastName email')
      .populate('delivery');
  },

  create: (newOrder) => {
    return Order.create(newOrder);
  },

  update: (id, updates) => {
    return Order.findByIdAndUpdate(id, updates, { new: true });
  },

  delete: (id) => {
    return Order.findByIdAndDelete(id);
  },

  insertMany: (orders) =>{
    return Order.insertMany(orders);
  }
}
