const Product = require('../models/Product');

// Lấy toàn bộ sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, type } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (type) filter.type = type;
    
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

// Tạo mới sản phẩm
exports.createProduct = async (req, res) => {
  try {
    let { name, brand, description, variants, specs, content, category, subcategory, price, flagship } = req.body;
    console.log('Dữ liệu nhận được (createProduct):', req.body, 'File:', req.file);

    // Xử lý variants
    let variantsParsed = variants;
    if (typeof variants === 'string') {
      try {
        variantsParsed = JSON.parse(variants);
      } catch (err) {
        console.error('Lỗi parse variants:', err.message);
        return res.status(400).json({ message: 'Trường variants không đúng định dạng JSON', error: err.message });
      }
    }

    // Xử lý specs
    let specsParsed = specs;
    if (typeof specs === 'string') {
      try {
        specsParsed = JSON.parse(specs) || [];
      } catch (err) {
        console.error('Lỗi parse specs:', err.message);
        return res.status(400).json({ message: 'Trường specs không đúng định dạng JSON', error: err.message });
      }
    }

    // Kiểm tra dữ liệu bắt buộc
    if (!name || !variantsParsed || !Array.isArray(variantsParsed) || variantsParsed.length === 0) {
      console.error('Dữ liệu bắt buộc thiếu:', { name, variantsParsed });
      return res.status(400).json({ message: 'Tên sản phẩm và variants là bắt buộc' });
    }

    // Xử lý variants
    const processedVariants = variantsParsed.map((variant, index) => {
      if (!variant || typeof variant !== 'object') {
        console.error(`Biến thể không hợp lệ tại index ${index}:`, variant);
        return res.status(400).json({ message: `Biến thể tại index ${index} không hợp lệ` });
      }
      const price = Number(variant.price);
      const quantity = Number(variant.quantity);
      if (isNaN(price) || isNaN(quantity)) {
        console.error(`Giá hoặc số lượng không hợp lệ tại index ${index}:`, { price, quantity });
        return res.status(400).json({ message: `Giá hoặc số lượng không hợp lệ tại biến thể ${index}` });
      }
      return {
        color: variant.color || '',
        ram: variant.ram || '',
        storage: variant.storage || '',
        price,
        quantity,
        images: Array.isArray(variant.images) ? variant.images : []
      };
    });

    const newProduct = new Product({
      name,
      brand: brand || '',
      description: description || '',
      variants: processedVariants,
      specs: specsParsed || [],
      content: content || '',
      category: category || '',
      subcategory: subcategory || '',
      price: Number(price) || 0,
      sold: 0,
      image: req.file?.filename || '',
      flagship: parseFlagship(flagship)
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Lỗi tạo sản phẩm:', err.message, err.stack);
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: err.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    let { name, brand, description, variants, specs, content, category, subcategory, price, flagship } = req.body;
    console.log('Dữ liệu nhận được (updateProduct):', req.body, 'File:', req.file);

    // Xử lý variants
    let variantsParsed = variants;
    if (typeof variants === 'string') {
      try {
        variantsParsed = JSON.parse(variants);
      } catch (err) {
        console.error('Lỗi parse variants:', err.message);
        return res.status(400).json({ message: 'Trường variants không đúng định dạng JSON', error: err.message });
      }
    }

    // Xử lý specs
    let specsParsed = specs;
    if (typeof specs === 'string') {
      try {
        specsParsed = JSON.parse(specs) || [];
      } catch (err) {
        console.error('Lỗi parse specs:', err.message);
        return res.status(400).json({ message: 'Trường specs không đúng định dạng JSON', error: err.message });
      }
    }

    // Kiểm tra dữ liệu bắt buộc
    if (!name || !variantsParsed || !Array.isArray(variantsParsed) || variantsParsed.length === 0) {
      console.error('Dữ liệu bắt buộc thiếu:', { name, variantsParsed });
      return res.status(400).json({ message: 'Tên sản phẩm và variants là bắt buộc' });
    }

    // Xử lý variants
    const processedVariants = variantsParsed.map((variant, index) => {
      if (!variant || typeof variant !== 'object') {
        console.error(`Biến thể không hợp lệ tại index ${index}:`, variant);
        return res.status(400).json({ message: `Biến thể tại index ${index} không hợp lệ` });
      }
      const price = Number(variant.price);
      const quantity = Number(variant.quantity);
      if (isNaN(price) || isNaN(quantity)) {
        console.error(`Giá hoặc số lượng không hợp lệ tại index ${index}:`, { price, quantity });
        return res.status(400).json({ message: `Giá hoặc số lượng không hợp lệ tại biến thể ${index}` });
      }
      return {
        color: variant.color || '',
        ram: variant.ram || '',
        storage: variant.storage || '',
        price,
        quantity,
        images: Array.isArray(variant.images) ? variant.images : []
      };
    });

    // Tìm sản phẩm
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.error('Không tìm thấy sản phẩm:', req.params.id);
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Cập nhật dữ liệu
    product.name = name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.variants = processedVariants;
    product.specs = specsParsed || product.specs;
    product.content = content || product.content;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.price = Number(price) || product.price;
    product.flagship = parseFlagship(flagship);
    if (req.file) {
      product.image = req.file.filename;
    }

    // Lưu sản phẩm
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Lỗi cập nhật sản phẩm:', err.message, err.stack);
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