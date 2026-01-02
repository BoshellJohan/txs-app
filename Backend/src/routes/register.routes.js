const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controller');
router.post('/signup', registerController.signup);

module.exports = router;