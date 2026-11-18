import { Router } from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, uploadOrderProof } from '../controllers/order.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.post('/:id/proof', upload.single("proof"), uploadOrderProof);

export default router;
