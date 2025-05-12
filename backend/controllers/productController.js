const Product = require('../models/Product');

// @GET /api/products
// @desc Lấy danh sách sản phẩm
// @access Public
const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const products = await Product.find({ ...keyword });
  res.json(products);
};

// @GET /api/products/:id
// @desc Xem chi tiết 1 sản phẩm
// @access Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Sản phẩm không tồn tại' });
};

// @POST /api/products
// @desc Tạo sản phẩm mới (Admin)
// @access Private/Admin
const createProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } = req.body;

  const product = new Product({
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
    createdBy: req.user._id
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @PUT /api/products/:id
// @desc Cập nhật sản phẩm (Admin)
// @access Private/Admin
const updateProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
};

// @DELETE /api/products/:id
// @desc Xóa sản phẩm (Admin)
// @access Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Đã xóa sản phẩm' });
  } else {
    res.status(404).json({ message: 'Sản phẩm không tồn tại' });
  }
};

// @POST /api/products/:id/reviews
// @desc Gửi đánh giá sản phẩm
// @access Private/User
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Đã gửi đánh giá' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview
};
