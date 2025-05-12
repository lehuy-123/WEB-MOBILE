const Order = require('../models/Order');

// @POST /api/orders
// @desc Tạo đơn hàng mới
// @access Private
const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'Không có sản phẩm trong đơn hàng' });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @GET /api/orders/my
// @desc Lấy đơn hàng của người dùng hiện tại
// @access Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
};

// @GET /api/orders/:id
// @desc Lấy chi tiết đơn hàng theo ID
// @access Private (user hoặc admin)
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập đơn hàng này' });
    }
    res.json(order);
  } else {
    res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  }
};

// @PUT /api/orders/:id/status
// @desc Cập nhật trạng thái đơn hàng (Admin)
// @access Private/Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;

    if (status === 'Đã giao') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  }
};

// @DELETE /api/orders/:id
// @desc Hủy đơn hàng nếu chưa xử lý (User hoặc Admin)
// @access Private
const cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (
    order &&
    (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin')
  ) {
    if (order.status === 'Chờ xác nhận') {
      order.status = 'Đã hủy';
      const canceledOrder = await order.save();
      return res.json(canceledOrder);
    } else {
      return res.status(400).json({ message: 'Đơn hàng đã xử lý, không thể hủy' });
    }
  } else {
    res.status(404).json({ message: 'Không tìm thấy đơn hàng hoặc không đủ quyền' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
};
