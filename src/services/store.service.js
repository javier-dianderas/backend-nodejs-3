import { storeRepository } from '../repositories/store.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { createError } from '../utils/apiResponse.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
import { USER_ROLES } from '../utils/constants.js';

export const storeService = {
  getStores: async () => {
    return storeRepository.findAll();
  },

  getStoreById: async (id) => {
    const store = await storeRepository.findById(id);

    if (!store) {
      throw createError(ERROR_CODES.STORAGE_NOT_FOUND);
    }

    return store;
  },

  createStore: async (storeData) => {
    const { name, address, owner } = storeData;

    if (!name || !address || !owner) {
      throw createError(ERROR_CODES.VALIDATION_ERROR);
    }

    const ownerFound = await userRepository.getById(owner);

    if (!ownerFound) {
      throw createError(ERROR_CODES.OWNER_NOT_FOUND);
    }

    if (ownerFound.role !== USER_ROLES.STORE) {
      throw createError(ERROR_CODES.OWNER_MUST_BE_STORE_ROLE);
    }

    return storeRepository.create(storeData);
  },

  updateStore: async (id, storeData) => {
    const store = await storeRepository.update(id, storeData);

    if (!store) {
      throw createError(ERROR_CODES.STORAGE_NOT_FOUND);
    }

    return store;
  },

  deleteStore: async (id) => {
    const store = await storeRepository.delete(id);

    if (!store) {
      throw createError(ERROR_CODES.STORAGE_NOT_FOUND);
    }

    return store;
  },
};