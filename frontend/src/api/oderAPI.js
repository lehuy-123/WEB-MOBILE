import axios from 'axios';

// Tạo đơn hàng
export const createOrder = async (orderData) => {
  const res = await axios.post('http://localhost:5000/api/orders', orderData);
  return res.data;
};

// Hủy đơn hàng
export const cancelOrder = async (orderId) => {
  const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`);
  return res.data;
};

// Lấy đơn hàng của người dùng
export const getMyOrders = async () => {
  const res = await axios.get('http://localhost:5000/api/orders/my');
  return res.data;
};
