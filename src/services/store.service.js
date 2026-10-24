import { storeRepository } from '../repositories/store.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { createError } from '../utils/apiResponse.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
import { USER_ROLES } from '../utils/constants.js';
import logger from '../config/logger.js';

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

    const storeCreated = await storeRepository.create(storeData);
    logger.info(`Se creó la ubicación con id ${storeCreated._id}`);
    return storeCreated;
  },

  updateStore: async (id, storeData) => {
    const store = await storeRepository.update(id, storeData);

    if (!store) {
      throw createError(ERROR_CODES.STORAGE_NOT_FOUND);
    }
    logger.info(`Se actualizó la ubicación con id ${store._id}`);
    return store;
  },

  deleteStore: async (id) => {
    const store = await storeRepository.delete(id);

    if (!store) {
      throw createError(ERROR_CODES.STORAGE_NOT_FOUND);
    }
    logger.info(`Se eliminó la ubicación con id ${store._id}`);
    return store;
  },
};