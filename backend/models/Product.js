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
  description: String,
  content: String,
  image: { type: String, default: "" }, // Ảnh đại diện
  variants: [variantSchema],
  sold: { type: Number, default: 0 },
  flagship: { type: Boolean, default: false }, // ✅ Mặc định không phải flagship
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
