const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProgress, updateProgress, getUserData } = require('../controllers/userController');

router.get('/progress', protect, getProgress);
router.post('/progress/update', protect, updateProgress);
router.get('/data', protect, getUserData);

module.exports = router;