import express from 'express';
import usersController from './users.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
const router = express.Router();

router.get('', [authMiddleware, roleMiddleware('admin')], usersController.users);
router.get('/me', [authMiddleware], usersController.user);
router.get('/:id', [authMiddleware, roleMiddleware('admin')], usersController.userById);
router.post('/register', usersController.signup)

export default router;