const Favorite = require('../models/Favorite');
const Product = require('../models/Product');

// @POST /api/favorites
// @desc Thêm sản phẩm vào yêu thích
// @access Private
const addFavorite = async (req, res) => {
  const { productId } = req.body;

  const existing = await Favorite.findOne({
    user: req.user._id,
    product: productId
  });

  if (existing) {
    return res.status(400).json({ message: 'Sản phẩm đã có trong yêu thích' });
  }

  const favorite = await Favorite.create({
    user: req.user._id,
    product: productId
  });

  res.status(201).json(favorite);
};

// @DELETE /api/favorites/:productId
// @desc Xóa sản phẩm khỏi yêu thích
// @access Private
const removeFavorite = async (req, res) => {
  const { productId } = req.params;

  const favorite = await Favorite.findOneAndDelete({
    user: req.user._id,
    product: productId
  });

  if (favorite) {
    res.json({ message: 'Đã xóa khỏi danh sách yêu thích' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm trong danh sách yêu thích' });
  }
};

// @GET /api/favorites
// @desc Lấy danh sách sản phẩm yêu thích của user
// @access Private
const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id }).populate('product');
  res.json(favorites.map(f => f.product));
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
};
