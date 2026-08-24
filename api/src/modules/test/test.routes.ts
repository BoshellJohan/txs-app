import express from 'express';
const router = express.Router();
import {getAllUsers} from './test.controller.js';

router.get('/allUsers', getAllUsers);

export default router;