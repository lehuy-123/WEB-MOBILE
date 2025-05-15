const express = require('express');
const router = express.Router();

// 🛡️ Middleware xác thực và phân quyền
const authenticateToken = require('../middleware/authenticateToken.js');
const checkAdmin = require('../middleware/checkAdmin.js');

// 🎯 Import các hàm điều khiển (controllers)
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

// 🔓 PUBLIC ROUTES (người dùng thường có thể truy cập)
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/banchay', getBestSellers);
router.get('/sort', sortProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// 🔐 ADMIN ROUTES (chỉ admin có thể thao tác)
router.post('/', authenticateToken, checkAdmin, createProduct);
router.delete('/:id', authenticateToken, checkAdmin, deleteProduct);
router.put('/:id', authenticateToken, checkAdmin, updateProduct);

// 📦 Export route
module.exports = router;
