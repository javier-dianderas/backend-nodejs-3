import { Router } from 'express';
import { getStores, getStoreById, createStore, updateStore, deleteStore } from '../controllers/store.controller.js';

const router = Router();

router.get('/', getStores);

router.get('/:id', getStoreById);

router.post('/', createStore);

router.put('/:id', updateStore);

router.delete('/:id', deleteStore);

export default router;
