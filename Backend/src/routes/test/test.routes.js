const express = require('express');
const router = express.Router();
const testController = require('../../controllers/test/test.controller');

router.get('/allUsers', testController.getAllUsers);

module.exports = router;