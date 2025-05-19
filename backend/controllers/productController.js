const Product = require('../models/Product');

// Lấy toàn bộ sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, type } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (type) filter.type = type; // Nếu bạn có field 'type' (thể loại)
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: err.message });
  }
};


// Hàm chuẩn hóa boolean cho trường flagship
function parseFlagship(raw) {
  return raw === true || raw === 'true' || raw === 1 || raw === '1' || raw === 'on' || raw === 'checked';
}


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


// ======= PHẦN SỬA FLAGSHIP ========

// Hàm chuẩn hoá boolean từ form data (FormData hoặc JSON)
function parseFlagship(raw) {
  return raw === true || raw === 'true' || raw === 1 || raw === '1';
}






// Tạo mới sản phẩm
exports.createProduct = async (req, res) => {
  try {
    let { name, brand, description, variants, specs, content, category, subcategory, price, flagship } = req.body;
    // Parse variants/specs như cũ
    try {
      variants = JSON.parse(variants);
      specs = specs ? JSON.parse(specs) : [];
    } catch (err) {
      return res.status(400).json({ message: 'Trường variants hoặc specs không đúng định dạng JSON' });
    }

    if (!name || !variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ message: 'Tên sản phẩm và variants là bắt buộc' });
    }

    const processedVariants = variants.map((variant) => ({
      color: variant.color || '',
      ram: variant.ram || '',
      storage: variant.storage || '',
      price: Number(variant.price) || 0,
      quantity: Number(variant.quantity) || 0,
      images: Array.isArray(variant.images) ? variant.images : []
    }));

    const newProduct = new Product({
      name,
      brand: brand || '',
      description: description || '',
      variants: processedVariants,
      specs: specs || [],
      content: content || '',
      category: category || '',
      subcategory: subcategory || '',  // <== PHẢI BỔ SUNG DÒNG NÀY
      price: Number(price) || 0,
      sold: 0,
      image: req.file?.filename || '',
      flagship: parseFlagship(flagship)
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
    let { name, brand, description, variants, specs, content, category, price, flagship } = req.body;

    let variantsParsed = variants;
    if (typeof variants === 'string') {
      try {
        variantsParsed = JSON.parse(variants);
      } catch {
        return res.status(400).json({ message: 'Trường variants không đúng định dạng JSON' });
      }
    }

    if (!name || !variantsParsed || !Array.isArray(variantsParsed) || variantsParsed.length === 0) {
      return res.status(400).json({ message: 'Tên sản phẩm và variants là bắt buộc' });
    }

    const processedVariants = variantsParsed.map((variant) => ({
      color: variant.color || '',
      ram: variant.ram || '',
      storage: variant.storage || '',
      price: Number(variant.price) || 0,
      quantity: Number(variant.quantity) || 0,
      images: Array.isArray(variant.images) ? variant.images : []
    }));

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    product.name = name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.variants = processedVariants;
    product.specs = specs || product.specs;
    product.content = content || product.content;
    product.category = category || product.category;
    product.price = Number(price) || product.price;
    product.flagship = parseFlagship(flagship);

    await product.save();
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
