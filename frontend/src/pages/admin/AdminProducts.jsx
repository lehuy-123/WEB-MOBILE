// src/pages/admin/AdminProducts.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../../components/ProductForm';
import { fetchAllProducts } from '../../api/productAPI';
import '../../styles/AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // ✅ thêm state để sửa sản phẩm

  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch((err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
      });
  }, []);

  const handleSearch = () => {
    const result = products.filter(p =>
      p.name?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(result);
  };

  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prev => prev.filter(p => p._id !== id));
      setFiltered(prev => prev.filter(p => p._id !== id));
      alert('✅ Xoá sản phẩm thành công');
    } catch (err) {
      console.error('❌ Lỗi khi xoá sản phẩm:', err);
      alert('Xoá sản phẩm thất bại');
    }
  };

  const handleSaveProduct = async (productData) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    try {
      let response;

      if (editingProduct) {
        response = await axios.put(`http://localhost:5001/api/products/${editingProduct._id}`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ Cập nhật sản phẩm thành công');
        setProducts(prev =>
          prev.map(p => (p._id === editingProduct._id ? response.data : p))
        );
        setFiltered(prev =>
          prev.map(p => (p._id === editingProduct._id ? response.data : p))
        );
      } else {
        response = await axios.post('http://localhost:5001/api/products', productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ Thêm sản phẩm thành công');
        setProducts(prev => [...prev, response.data]);
        setFiltered(prev => [...prev, response.data]);
      }

      setEditingProduct(null); // reset form
    } catch (err) {
      console.error('❌ Lỗi khi lưu sản phẩm:', err);
      alert('Thao tác thất bại');
    }
  };

  return (
    <div className="admin-products">
      <h2>📦 Quản lý sản phẩm</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔎 Nhập tên sản phẩm để tìm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <ProductForm onSubmit={handleSaveProduct} editingProduct={editingProduct} />

      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Giá</th>
              <th>Ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={index}>
                <td>{p.name || 'Không có tên'}</td>
                <td>{typeof p.price === 'number' ? `${p.price.toLocaleString()} VND` : 'Chưa cập nhật'}</td>
                <td>
                  {p.image ? (
                    <img src={p.image} alt={p.name || 'ảnh sản phẩm'} height={40} />
                  ) : (
                    'Không có ảnh'
                  )}
                </td>
                <td>
                  <button onClick={() => setEditingProduct(p)}>✏️ Sửa</button>{' '}
                  <button onClick={() => handleDelete(p._id)} className="delete-button">🗑 Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
