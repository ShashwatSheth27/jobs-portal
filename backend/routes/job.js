const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job');
const authenticate = require('../middleware/authenticate');

router.post('/postJob', authenticate, jobController.postJob);
router.post('/fetchJobs', authenticate, jobController.fetchJobs);

module.exports = router;