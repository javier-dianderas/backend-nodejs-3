import { Router } from 'express';
import { getProductsByFilter, getProductById, getProductShippingCostById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProductsByFilter);

router.get('/:id', getProductById);

router.get('/:id/shipping-cost', getProductShippingCostById);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
