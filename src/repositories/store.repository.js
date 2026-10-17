import Store from '../models/store.model.js';

export const storeRepository = {
  findAll: async () => {
    return Store.find();
  },

  findById: async (id) => {
    return Store.findById(id);
  },

  create: async (storeData) => {
    return Store.create(storeData);
  },

  insertMany: async (stores) => {
    return Store.insertMany(stores);
  },

  update: async (id, storeData) => {
    return Store.findByIdAndUpdate(id, storeData, {
      new: true,
      runValidators: true,
    });
  },

  delete: async (id) => {
    return Store.findByIdAndDelete(id);
  },

  insertMany: (stores) =>{
    return Store.insertMany(stores);
  }
};
