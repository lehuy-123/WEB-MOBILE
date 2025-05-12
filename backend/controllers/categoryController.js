const Category = require('../models/Category');

// @GET /api/categories
// @desc Lấy danh sách danh mục
// @access Public
const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

// @POST /api/categories
// @desc Tạo danh mục mới
// @access Private/Admin
const createCategory = async (req, res) => {
  const { name, slug, description } = req.body;

  const categoryExists = await Category.findOne({ slug });
  if (categoryExists) {
    return res.status(400).json({ message: 'Slug đã tồn tại' });
  }

  const category = await Category.create({
    name,
    slug,
    description,
    createdBy: req.user._id
  });

  res.status(201).json(category);
};

// @PUT /api/categories/:id
// @desc Cập nhật danh mục
// @access Private/Admin
const updateCategory = async (req, res) => {
  const { name, slug, description } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.slug = slug;
    category.description = description;

    const updated = await category.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục' });
  }
};

// @DELETE /api/categories/:id
// @desc Xóa danh mục
// @access Private/Admin
const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: 'Đã xóa danh mục' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
