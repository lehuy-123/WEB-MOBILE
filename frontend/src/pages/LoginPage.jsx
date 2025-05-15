import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // nếu cần

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

      localStorage.setItem('user', JSON.stringify({
        token: res.data.token,
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

      <p style={{ marginTop: '10px' }}>
        {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
        <button onClick={() => setIsLoginMode(!isLoginMode)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isLoginMode ? 'Đăng ký' : 'Đăng nhập'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
