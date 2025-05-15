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
    const bestSellers = await Product.find({ sold: { $gt: 50 } })
      .sort({ sold: -1 })
      .limit(8);
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


exports.createProduct = async (req, res) => {
  try {
    let { name, brand, description, variants, specs, content, category, price } = req.body;

    // ✅ Chuyển đổi chuỗi sang JSON
    try {
      variants = JSON.parse(variants);
      specs = specs ? JSON.parse(specs) : [];
    } catch (err) {
      return res.status(400).json({ message: 'Trường variants hoặc specs không đúng định dạng JSON' });
    }

    // Kiểm tra các field bắt buộc
    if (!name || !variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ message: 'Tên sản phẩm và variants là bắt buộc' });
    }

    // Xử lý biến thể
    const processedVariants = variants.map((variant, index) => {
      return {
        color: variant.color || '',
        ram: variant.ram || '',
        storage: variant.storage || '',
        price: Number(variant.price) || 0,
        quantity: Number(variant.quantity) || 0,
        images: Array.isArray(variant.images) ? variant.images : []
      };
    });

    const newProduct = new Product({
      name,
      brand: brand || '',
      description: description || '',
      variants: processedVariants,
      specs: specs || [],
      content: content || '',
      category: category || '',
      price: Number(price) || 0,
      sold: 0,
      image: req.file?.filename || ''
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Lỗi tạo sản phẩm:', err);
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: err.message });
  }
};


// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, brand, description, variants, specs, content, category, price } = req.body;

    // Log dữ liệu nhận được để debug
    console.log('Dữ liệu nhận được:', req.body);

    // Kiểm tra các field bắt buộc
    if (!name || !variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ message: 'Tên sản phẩm và variants là bắt buộc' });
    }

    // Ánh xạ variants để đảm bảo đúng định dạng schema
    const processedVariants = variants.map((variant, index) => {
      console.log(`Biến thể ${index + 1}:`, variant); // Log từng biến thể để kiểm tra
      return {
        color: variant.color || '',
        ram: variant.ram || '',
        storage: variant.storage || '',
        price: Number(variant.price) || 0,
        quantity: Number(variant.quantity) || 0,
        images: Array.isArray(variant.images) ? variant.images : [] // Đảm bảo images là mảng
      };
    });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    // Cập nhật các field
    product.name = name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.variants = processedVariants;
    product.specs = specs || product.specs;
    product.content = content || product.content;
    product.category = category || product.category;
    product.price = Number(price) || product.price;

    await product.save();
    console.log('Sản phẩm đã cập nhật:', product); // Log sản phẩm sau khi cập nhật
    res.json(product);
  } catch (err) {
    console.error('Lỗi cập nhật:', err);
    res.status(500).json({ message: 'Cập nhật sản phẩm thất bại', error: err.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    console.log('👉 Xoá sản phẩm:', req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Xoá sản phẩm thành công' });
  } catch (err) {
    console.error('❌ Lỗi xoá:', err.message);
    res.status(500).json({ message: 'Lỗi khi xoá sản phẩm', error: err.message });
  }
};

// Lấy sản phẩm theo ID
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