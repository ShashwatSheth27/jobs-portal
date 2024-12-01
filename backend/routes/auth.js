const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); 

router.post('/registerUserDetails', authController.registerUserDetails);
router.post('/verifyOtp', authController.verifyOtp);
router.post('/login', authController.login);

module.exports = router;