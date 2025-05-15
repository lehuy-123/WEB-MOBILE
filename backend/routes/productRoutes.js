const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 📤 CẤU HÌNH UPLOAD – ĐẶT Ở ĐẦU
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// 🛡️ Middleware xác thực và phân quyền
const authenticateToken = require('../middleware/authenticateToken.js');
const checkAdmin = require('../middleware/checkAdmin.js');

// 🎯 Controllers
const {
  getFeaturedProducts,
  getAllProducts,
  searchProducts,
  createProduct,
  sortProducts,
  getBestSellers,
  getProductById,
  deleteProduct,
  updateProduct
} = require('../controllers/productController');

// 🔓 ROUTES PUBLIC
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/banchay', getBestSellers);
router.get('/sort', sortProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// 🔐 ROUTES ADMIN
router.post(
  '/',
  authenticateToken,
  checkAdmin,
  upload.single('image'), // ✅ đã sửa đúng vị trí
  createProduct
);
router.put('/:id', authenticateToken, checkAdmin, updateProduct);
router.delete('/:id', authenticateToken, checkAdmin, deleteProduct);

// 📤 ROUTE UPLOAD ẢNH RIÊNG
router.post(
  '/upload',
  authenticateToken,
  checkAdmin,
  upload.single('image'),
  (req, res) => {
    const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl: fullUrl });
  }
);

// 📦 EXPORT ROUTER
module.exports = router;
