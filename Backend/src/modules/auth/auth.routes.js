import express from 'express';
const router = express.Router();

import authController from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';


router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/getuser', authController.getUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/register', authController.signup);
router.get('/me', authMiddleware, async(req, res) => {
    res.json(req.user);
})

export default router;