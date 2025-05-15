// src/api/productAPI.js

import axios from 'axios';

export const fetchProducts = async () => {
  const res = await axios.get('http://localhost:5001/api/products');
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`http://localhost:5001/api/products/${id}`);
  return res.data;
};

export const fetchAllProducts = async () => {
  const res = await axios.get('http://localhost:5001/api/products');
  return res.data;
};


export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}/category/${category}`);
  return res.data;
};



export const createProduct = async (productData) => {
  const res = await axios.post(`${API_URL}`, productData);
  return res.data;
};

export const fetchBestSellers = async () => {
  const res = await fetch('http://localhost:5001/api/products/banchay');
  const data = await res.json();
  return data;
};
