import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', form);
      alert('✅ Đăng ký thành công, mời bạn đăng nhập');
      navigate('/login');
    } catch (err) {
      alert('❌ Đăng ký thất bại: ' + (err.response?.data?.message || 'Lỗi không xác định'));
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Tên người dùng"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
