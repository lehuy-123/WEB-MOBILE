const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @route   POST /api/auth/register
// @desc    Đăng ký tài khoản
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email đã tồn tại' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } else {
    res.status(400).json({ message: 'Tạo tài khoản thất bại' });
  }
};

// @route   POST /api/auth/login
// @desc    Đăng nhập và trả token
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } else {
    res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
  }
};

// @route   GET /api/auth/profile
// @desc    Trả thông tin người dùng đã đăng nhập
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
