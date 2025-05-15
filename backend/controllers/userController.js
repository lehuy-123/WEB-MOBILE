exports.cancelOrder = (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  }

  order.status = 'Đã hủy';
  res.json({ message: 'Đơn hàng đã được hủy', order });
};
