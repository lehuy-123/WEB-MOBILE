const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ hoặc hết hạn' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
