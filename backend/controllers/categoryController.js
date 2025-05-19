const Category = require('../models/Category');

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

// Xoá danh mục
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xoá danh mục' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xoá danh mục', error: err.message });
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

