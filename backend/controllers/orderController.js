let orders = []; // 📦 Danh sách đơn hàng lưu mock

exports.createOrder = (req, res) => {
  const { name, address, phone, items } = req.body;

  if (!name || !address || !phone || !items || items.length === 0) {
    return res.status(400).json({ message: 'Thiếu thông tin đơn hàng' });
  }

  // Tính tổng tiền
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }

  const newOrder = {
    id: orders.length + 1,
    name,
    address,
    phone,
    items,
    total,
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Đã tạo đơn hàng thành công', order: newOrder });
};



exports.getOrders = (req, res) => {
  res.json(orders);
};


exports.cancelOrder = (req, res) => {
  // Xử lý logic huỷ đơn ở đây
  res.json({ message: 'Đã huỷ đơn hàng' });
};
