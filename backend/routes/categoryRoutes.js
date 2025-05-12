const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { protect, admin } = require('../middleware/authMiddleware');

// Lấy danh sách danh mục (public)
router.get('/', getCategories);

// Tạo danh mục mới (admin)
router.post('/', protect, admin, createCategory);

// Cập nhật danh mục (admin)
router.put('/:id', protect, admin, updateCategory);

// Xóa danh mục (admin)
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
