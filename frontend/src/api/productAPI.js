import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/products';

// 1. Lấy danh sách sản phẩm (có hỗ trợ tìm kiếm, lọc, sắp xếp)
export const fetchProducts = async (params = {}) => {
  const res = await axios.get(API_BASE, { params });
  return res.data;
};

// 2. Lấy chi tiết sản phẩm theo ID
export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// 3. Gửi đánh giá sản phẩm (yêu cầu token)
export const submitReview = async (productId, reviewData, token) => {
  const res = await axios.post(
    `${API_BASE}/${productId}/reviews`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
};

// 4. Tạo sản phẩm mới (admin)
export const createProduct = async (product, token) => {
  const res = await axios.post(API_BASE, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 5. Cập nhật sản phẩm
export const updateProduct = async (id, product, token) => {
  const res = await axios.put(`${API_BASE}/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 6. Xoá sản phẩm
export const deleteProduct = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Thêm dòng mới nếu chưa có
export const fetchFeaturedProducts = async () => {
  const res = await axios.get('http://localhost:5000/api/products/featured');
  return res.data;
};
