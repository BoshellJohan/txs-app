import express from 'express';
import passwordController from './password.controller.js';
const router = express.Router();

router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password', passwordController.resetPassword);
export default router;