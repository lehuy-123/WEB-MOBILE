// Middleware: không tìm thấy route
const notFound = (req, res, next) => {
  const error = new Error(`🔍 Không tìm thấy đường dẫn: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware: xử lý lỗi chung
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message || 'Đã xảy ra lỗi',
    stack: process.env.NODE_ENV === 'production' ? '🔥 Ẩn trong production' : err.stack
  });
};

module.exports = { notFound, errorHandler };
