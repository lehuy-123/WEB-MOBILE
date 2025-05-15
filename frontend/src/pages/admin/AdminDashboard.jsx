import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ Kiểm tra quyền truy cập admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'admin') {
      alert('⛔ Bạn không có quyền truy cập trang quản trị.');
      navigate('/'); // Chuyển về trang chủ hoặc login
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-content">
        <h1 className="admin-title">🎯 Trang quản trị MiniTech</h1>
        <p>
          Chọn chức năng từ menu bên trái để bắt đầu quản lý sản phẩm, đơn hàng, thanh toán, v.v...
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
