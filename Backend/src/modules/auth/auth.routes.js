const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const { authMiddleware } = require('./auth.middleware');
const { roleMiddleware } = require('../../middlewares/role.middleware');

router.post('/forgot-password', authController.forgotPassword)
router.post('/getuser', authController.getUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/register', authController.signup);
router.get('/me', authMiddleware, async(req, res) => {
    res.json(req.user);
})

module.exports = router;