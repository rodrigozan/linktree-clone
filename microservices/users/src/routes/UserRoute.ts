import { Router } from 'express';

import UserController from '../controllers/UserController';

import { authMiddleware, ownerMiddleware } from '../middlewares/authMiddleware';

const controller = UserController

const router = Router();

router.post('/users', controller.create);
router.get('/users', controller.get);
router.get('/users/:id', controller.getById);
router.get('/users/search/:field', controller.getOne);
router.put('/users/:id', authMiddleware, ownerMiddleware, controller.update);
router.delete('/users/:id', authMiddleware, ownerMiddleware, controller.delete);

export default router