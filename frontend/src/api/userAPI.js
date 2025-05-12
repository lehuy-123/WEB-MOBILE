import axios from 'axios';

export const getProfile = async () => {
  const res = await axios.get('http://localhost:5000/api/auth/profile');
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.put('http://localhost:5000/api/user/profile', data);
  return res.data;
};
