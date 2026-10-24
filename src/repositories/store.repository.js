import Store from '../models/store.model.js';

export const storeRepository = {
  findAll: async () => {
    return await Store.find();
  },

  findById: async (id) => {
    return await Store.findById(id);
  },

  create: async (storeData) => {
    return await Store.create(storeData);
  },

  insertMany: async (stores) => {
    return await Store.insertMany(stores);
  },

  update: async (id, storeData) => {
    return await Store.findByIdAndUpdate(id, storeData, {
      new: true,
      runValidators: true,
    });
  },

  delete: async (id) => {
    return await Store.findByIdAndDelete(id);
  },

  insertMany: async (stores) =>{
    return await Store.insertMany(stores);
  }
};
