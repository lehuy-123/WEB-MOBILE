import axios from 'axios';

export const getCart = async () => {
  const res = await axios.get('http://localhost:5000/api/cart');
  return res.data;
};

export const updateCartItem = async (itemId, quantity) => {
  await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity });
};

export const deleteCartItem = async (itemId) => {
  await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
};

export const getCartTotal = async () => {
  const res = await axios.get('http://localhost:5000/api/cart/total');
  return res.data.total;
};
