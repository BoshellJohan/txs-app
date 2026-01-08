const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.post('/login', authController.login);
router.post('/getuser', authController.getUser);
router.post('/register', authController.signup);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;