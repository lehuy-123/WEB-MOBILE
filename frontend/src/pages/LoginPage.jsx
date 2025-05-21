import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // nếu cần

const GOOGLE_AUTH_URL = 'http://localhost:5001/auth/google';

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // true = Login, false = Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });

      // Lưu token (chuẩn nhất nên lưu riêng token)
      localStorage.setItem('token', res.data.token);
      // Có thể lưu thêm thông tin user nếu muốn:
      localStorage.setItem('user', JSON.stringify({
        role: res.data.role,
        name: res.data.name,
        email: res.data.email
      }));

      // 👉 Phân hướng
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Đăng nhập thất bại!');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        name, email, password
      });
      alert('Đăng ký thành công! Hãy đăng nhập.');
      setIsLoginMode(true); // chuyển sang chế độ login
    } catch (err) {
      alert('Đăng ký thất bại!');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLoginMode ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản'}</h2>
      <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
        {!isLoginMode && (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Họ tên"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">{isLoginMode ? 'Đăng nhập' : 'Đăng ký'}</button>
      </form>

      <div style={{ marginTop: 16, marginBottom: 8, textAlign: 'center' }}>
        <span>Hoặc</span>
      </div>

      {/* Nút đăng nhập bằng Google */}
      <a href={GOOGLE_AUTH_URL} style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
        <button type="button" className="google-login-btn" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: '#fff',
          color: '#222',
          border: '1px solid #ddd',
          borderRadius: 6,
          padding: '7px 18px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: 15,
          boxShadow: '0 2px 4px #0001'
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="" width={22} height={22} />
          Đăng nhập bằng Google
        </button>
      </a>

      <p style={{ marginTop: '18px' }}>
        {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
        <button onClick={() => setIsLoginMode(!isLoginMode)} style={{ color: '#1573d6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          {isLoginMode ? 'Đăng ký' : 'Đăng nhập'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
