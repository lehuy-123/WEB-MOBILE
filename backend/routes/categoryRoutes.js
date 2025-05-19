const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Thêm, sửa, xoá, lấy danh mục
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.delete('/:id', categoryController.deleteCategory);
// Trong router
router.put('/:id', categoryController.updateCategory);

// ... update (PUT) tuỳ ý

module.exports = router;
