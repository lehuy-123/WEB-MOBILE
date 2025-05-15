import React, { useState } from 'react';
import '../../styles/AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'user', active: true },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'admin', active: true },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'user', active: false },
  ]);

  const toggleStatus = (id) => {
    const updated = users.map(u =>
      u.id === id ? { ...u, active: !u.active } : u
    );
    setUsers(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xoá người dùng?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="admin-users-container">
      <h2>👥 Quản lý người dùng</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.active ? 'Đang hoạt động' : 'Đã bị chặn'}
              </td>
              <td>
                <button onClick={() => toggleStatus(u.id)} className="block-btn">
                  {u.active ? 'Chặn' : 'Mở'}
                </button>
                <button onClick={() => handleDelete(u.id)} className="delete-btn">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
