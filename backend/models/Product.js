const mongoose = require('mongoose');

// Biến thể sản phẩm
const variantSchema = new mongoose.Schema({
  color: String,
  ram: String,
  storage: String,
  price: Number,
  quantity: Number,
  images: [String]
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  description: String, // mô tả ngắn
  content: String, // bài viết mô tả chi tiết (hiển thị dưới trang sản phẩm)
  variants: [variantSchema], // ✅ danh sách các biến thể
  sold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
