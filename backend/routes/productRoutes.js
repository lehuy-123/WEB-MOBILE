// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const {
  getFeaturedProducts,
  getAllProducts,
  searchProducts,
  createProduct,
  sortProducts,
  getBestSellers,
  getProductById
} = require('../controllers/productController');

// Định nghĩa các route
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/banchay', getBestSellers);      // ✅ route sản phẩm bán chạy
router.get('/sort', sortProducts);
router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);


module.exports = router;
