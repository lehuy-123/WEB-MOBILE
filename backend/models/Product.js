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
  image: { type: String, default: "" }, // ✅ THÊM DÒNG NÀY
  variants: [variantSchema],
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
