const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');

const { protect, admin } = require('../middleware/authMiddleware');

// Tạo đơn hàng mới
router.post('/', protect, createOrder);

// Lấy danh sách đơn hàng của người dùng hiện tại
router.get('/my', protect, getMyOrders);

// Lấy chi tiết đơn hàng theo ID
router.get('/:id', protect, getOrderById);

// Cập nhật trạng thái đơn hàng (admin)
router.put('/:id/status', protect, admin, updateOrderStatus);

// Hủy đơn hàng (user hoặc admin nếu chưa xử lý)
router.delete('/:id', protect, cancelOrder);

module.exports = router;
