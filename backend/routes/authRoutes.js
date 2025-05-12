const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Đăng ký tài khoản
router.post('/register', registerUser);

// Đăng nhập tài khoản
router.post('/login', loginUser);

// Lấy thông tin cá nhân người dùng (cần token)
router.get('/profile', protect, getUserProfile);

module.exports = router;
