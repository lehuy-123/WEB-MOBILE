const checkAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Bạn không có quyền admin' });
  }
};

module.exports = checkAdmin;
