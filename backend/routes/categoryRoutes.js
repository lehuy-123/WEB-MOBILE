const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticateToken');
const checkAdmin = require('../middleware/checkAdmin');


// Thêm, sửa, xoá, lấy danh mục
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
// Xóa danh mục (admin)
router.delete('/:id', authenticateToken, checkAdmin, categoryController.deleteCategory);


router.put('/:id', categoryController.updateCategory);

// ... update (PUT) tuỳ ý

module.exports = router;
