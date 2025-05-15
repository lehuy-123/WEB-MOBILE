let cart = []; // 🛒 Mock giỏ hàng toàn cục – mỗi user thật sau này sẽ có riêng

exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;

  // Kiểm tra đủ dữ liệu
  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Thiếu productId hoặc quantity' });
  }

  // Kiểm tra nếu sản phẩm đã có trong giỏ thì cộng dồn
const existing = cart.find(item => item.productId === Number(productId));
if (existing) {
  existing.quantity += Number(quantity);
} else {
  cart.push({ productId: Number(productId), quantity: Number(quantity) });
}

  res.status(201).json({ message: 'Đã thêm vào giỏ hàng', cart });
};







exports.getCart = (req, res) => {
  res.json(cart);
};






exports.updateCartItem = (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  const item = cart.find(i => i.productId === productId);

  if (!item) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
  }

  item.quantity = quantity;
  res.json({ message: 'Đã cập nhật số lượng', cart });
};


exports.deleteCartItem = (req, res) => {
  const productId = parseInt(req.params.productId);
  const index = cart.findIndex(item => item.productId === productId);

  if (index === -1) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
  }

  cart.splice(index, 1);
  res.json({ message: 'Đã xoá sản phẩm khỏi giỏ hàng', cart });
};
