const express = require('express');
const router = express.Router();

// ✅ Route تجريبية (بدون Controller)
router.get('/test', (req, res) => {
    res.json({ msg: '✅ User routes working!' });
});

module.exports = router;