const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job'); 

router.post('/postJob', jobController.postJob);

module.exports = router;