import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>📊 Admin Panel</h2>
      <ul>
        <li><Link to="/admin/products">🛒 Quản lý sản phẩm</Link></li>
        <li><Link to="/admin/orders">📦 Quản lý đơn hàng</Link></li>
        <li><Link to="/admin/payments">💳 Quản lý thanh toán</Link></li>
        <li><Link to="/admin/users">👥 Quản lý người dùng</Link></li>
        <li><Link to="/">🏠 Về trang chính</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
