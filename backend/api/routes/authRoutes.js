const express = require('express');
const router = express.Router();

// Import Controller
const authController = require('../controllers/authController');

// ✅ Routes حقيقية
router.post('/register', authController.register);
router.post('/login', authController.login);

// ✅ Route تجريبية (بدون Controller)
router.get('/test', (req, res) => {
    res.json({ msg: '✅ Auth routes working!' });
});

module.exports = router;