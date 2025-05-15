import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-title">🎯 Trang quản trị MiniTech</h1>
        <p>Chọn chức năng từ menu bên trái để bắt đầu quản lý sản phẩm, đơn hàng, thanh toán, v.v...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
