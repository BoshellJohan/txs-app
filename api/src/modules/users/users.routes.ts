import express from 'express';
import usersController from './users.controller.js';
const router = express.Router();

router.get('/me');
router.post('/register', usersController.signup)

export default router;