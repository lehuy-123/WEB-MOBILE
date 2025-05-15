const express = require('express');
const router = express.Router();

const { registerUser, login } = require('../controllers/authController');

// ✅ Route đăng ký tài khoản
router.post('/register', registerUser);

// ✅ Route đăng nhập
router.post('/login', login);

module.exports = router;
