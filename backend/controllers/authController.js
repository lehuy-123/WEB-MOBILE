const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Đăng ký tài khoản
// Đăng ký tài khoản
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email đã được sử dụng!' });
    }

    // KHÔNG hash password ở đây
    const user = new User({
      name,
      email,
      password, // truyền plain-textbb
      role: 'user',
    });

    await user.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    console.error('❌ Lỗi đăng ký:', err);
    res.status(500).json({ message: 'Lỗi máy chủ khi đăng ký.' });
  }
};


// Đă
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    'your-secret',
    { expiresIn: '1d' }
  );

  res.json({
    token,
    role: user.role,
    name: user.name,
    email: user.email,
  });
};
