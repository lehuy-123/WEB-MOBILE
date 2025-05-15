// src/pages/OrdersPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OrdersPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách đơn hàng:', err));
  }, []);

  return (
    <div className="orders-container">
      <h2>Lịch sử đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <h4>Ngày: {new Date(order.createdAt).toLocaleDateString()}</h4>
              <p><strong>Họ tên:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Địa chỉ:</strong> {order.address}</p>
              <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} VND</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} x{item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;