// controllers/productController.js
const Product = require('../models/Product');

// Lấy toàn bộ sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: err.message });
  }
};

// Tìm kiếm sản phẩm theo tên
exports.searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q || '';
    const results = await Product.find({
      name: { $regex: keyword, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tìm kiếm sản phẩm', error: err.message });
  }
};

// Lấy sản phẩm nổi bật (top 2 mới nhất)
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({}).sort({ createdAt: -1 }).limit(2);
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm nổi bật', error: err.message });
  }
};

// Lấy sản phẩm bán chạy
exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({}).sort({ sold: -1 }).limit(8);
    res.json(bestSellers);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm bán chạy', error: err.message });
  }
};

// Sắp xếp sản phẩm
exports.sortProducts = async (req, res) => {
  try {
    const sortBy = req.query.by || 'price';
    let sortQuery = {};

    if (sortBy === 'price') sortQuery = { price: 1 };
    else if (sortBy === 'rating') sortQuery = { rating: -1 };
    else if (sortBy === 'newest') sortQuery = { createdAt: -1 };
    else return res.status(400).json({ message: 'Tham số sort không hợp lệ' });

    const sorted = await Product.find({}).sort(sortQuery);
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi sắp xếp sản phẩm', error: err.message });
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo sản phẩm', error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(product);
  } catch (error) {
    console.error('Lỗi truy vấn sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};