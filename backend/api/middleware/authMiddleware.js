const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'غير مصرح بالوصول' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'لا يوجد توكين' });
  }
};

module.exports = { protect };