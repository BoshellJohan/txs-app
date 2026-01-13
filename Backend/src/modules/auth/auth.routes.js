const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const { authMiddleware } = require('./auth.middleware');

router.post('/login', authController.login);
router.post('/getuser', authController.getUser);
router.post('/register', authController.signup);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, async(req, res) => {
    res.json(req.user);
})

module.exports = router;