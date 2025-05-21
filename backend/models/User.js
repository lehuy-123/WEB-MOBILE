const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Không còn required (vì Google login không có password)
    phone: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    googleId: { type: String }, // Thêm trường GoogleId
    avatar: { type: String }    // Thêm trường avatar (ảnh đại diện)
  },
  {
    timestamps: true
  }
);

// Chỉ hash password nếu tồn tại và đã sửa đổi (tránh user Google bị lỗi)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Hàm so sánh mật khẩu khi đăng nhập truyền thống
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Nếu user không có password (đăng nhập Google), luôn trả về false
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
