import express from 'express';
const router = express.Router();

import authController from './auth.controller.js';
import { loginLimiter, registerLimiter, forgotPasswordLimiter } from "../../middlewares/rateLimit.middleware.js";

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

export default router;