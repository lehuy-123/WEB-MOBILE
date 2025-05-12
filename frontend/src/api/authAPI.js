import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/auth';

// 1. Đăng ký tài khoản mới
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE}/register`, userData);
  return res.data;
};

// 2. Đăng nhập
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_BASE}/login`, credentials);
  return res.data;
};

// 3. Lấy thông tin user hiện tại (dựa trên token)
export const fetchUserProfile = async (token) => {
  const res = await axios.get(`${API_BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
