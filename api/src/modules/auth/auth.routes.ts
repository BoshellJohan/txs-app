import express from 'express';
const router = express.Router();

import authController from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { loginLimiter, registerLimiter, forgotPasswordLimiter } from "../../middlewares/rateLimit.middleware.js";

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/me', authMiddleware, async(req, res) => {
    res.json(req.user);
})

export default router;