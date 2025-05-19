const mongoose = require('mongoose');

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
  category: String,       // slug của danh mục cha
  subcategory: String,    // slug của danh mục con
  description: String,
  content: String,
  image: { type: String, default: "" },
  variants: [variantSchema],
  sold: { type: Number, default: 0 },
  flagship: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
