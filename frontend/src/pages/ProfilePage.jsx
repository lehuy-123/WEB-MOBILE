import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../api/userAPI';
import { getMyOrders, cancelOrder } from '../api/oderAPI';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');

  const loadUser = async () => {
    const data = await getProfile();
    setUser(data);
    setForm({ name: data.name, email: data.email });
  };

  const loadOrders = async () => {
    const data = await getMyOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadUser();
    loadOrders();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      setMessage('✅ Cập nhật thành công!');
    } catch {
      setMessage('❌ Có lỗi khi cập nhật.');
    }
  };

  const handleCancel = async (orderId) => {
    await cancelOrder(orderId);
    loadOrders();
  };

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleUpdate} className="profile-form">
        <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Tên" />
        <input name="email" value={form.email || ''} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Mật khẩu mới (nếu cần)" />
        <button type="submit">Cập nhật</button>
      </form>
      {message && <p className="profile-message">{message}</p>}

      <h3>Lịch sử đơn hàng</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày</th>
            <th>Tổng</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>{o.totalPrice.toLocaleString()} VND</td>
              <td>{o.status}</td>
              <td>
                {o.status === 'Chờ xác nhận' && (
                  <button onClick={() => handleCancel(o._id)}>Huỷ</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfilePage;
