const express = require('express');
const router = express.Router();

const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require('../controllers/favoriteController');

const { protect } = require('../middleware/authMiddleware');

// Thêm sản phẩm vào danh sách yêu thích
router.post('/', protect, addFavorite);

// Lấy danh sách yêu thích của người dùng
router.get('/', protect, getFavorites);

// Xóa sản phẩm khỏi danh sách yêu thích
router.delete('/:productId', protect, removeFavorite);

module.exports = router;
