const express = require('express');
const router = express.Router();
const testController = require('./test.controller');

router.get('/allUsers', testController.getAllUsers);

module.exports = router;