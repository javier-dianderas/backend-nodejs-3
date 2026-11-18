import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, uploadUserDocument } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post("/:id/documents", upload.single("document"), uploadUserDocument);

export default router;
