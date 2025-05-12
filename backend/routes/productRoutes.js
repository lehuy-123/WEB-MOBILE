const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// Lấy danh sách sản phẩm (tìm kiếm, phân trang)
router.get('/', getProducts);

// Lấy chi tiết 1 sản phẩm
router.get('/:id', getProductById);

// Thêm sản phẩm mới (Admin)
router.post('/', protect, admin, createProduct);

// Cập nhật sản phẩm (Admin)
router.put('/:id', protect, admin, updateProduct);

// Xóa sản phẩm (Admin)
router.delete('/:id', protect, admin, deleteProduct);

// Gửi đánh giá sản phẩm (User)
router.post('/:id/reviews', protect, createReview);

module.exports = router;
