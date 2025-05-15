// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '', avatar: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/user/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error('Lỗi khi tải profile:', err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cập nhật:', user);
    setEditing(false);
    alert('Cập nhật thành công!');
  };

  return (
    <div className="profile-container">
      <h2>Hồ sơ cá nhân</h2>
      <img src={user.avatar || 'https://i.pravatar.cc/100'} alt="avatar" className="avatar" />

      {editing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <input name="name" value={user.name} onChange={handleChange} />
          <input name="email" value={user.email} onChange={handleChange} />
          <button type="submit">Lưu thay đổi</button>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Chỉnh sửa</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;