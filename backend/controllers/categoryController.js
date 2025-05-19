const Category = require('../models/Category');
const Product = require('../models/Product'); // Nếu muốn kiểm tra trước khi xoá

// Thêm danh mục

exports.createCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const newCategory = new Category({
      name,
      slug,
      parentId: parentId || null
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo danh mục', error: err.message });
  }
};

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh mục', error: err.message });
  }
};

// Xoá danh mục theo ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Nếu muốn chặn xoá khi còn sản phẩm thuộc danh mục:
    const hasProduct = await Product.exists({ $or: [{ category: id }, { subcategory: id }] });
    if (hasProduct) {
      return res.status(400).json({ message: 'Không thể xoá vì vẫn còn sản phẩm thuộc danh mục này!' });
    }

    // Xoá danh mục con trước (nếu là cha)
    await Category.deleteMany({ parentId: id });

    // Xoá chính nó
    await Category.findByIdAndDelete(id);

    res.json({ message: 'Đã xoá danh mục thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Xoá danh mục thất bại', error: err.message });
  }
};

// Sửa danh mục (tuỳ chọn)
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, description },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật danh mục', error: err.message });
  }
};

