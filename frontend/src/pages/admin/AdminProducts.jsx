// src/pages/admin/AdminProducts.jsx
import React, { useEffect, useState } from 'react';
import ProductForm from '../../components/ProductForm';
import { fetchAllProducts } from '../../api/productAPI';  // ✅ Đúng tên hàm
import '../../styles/AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .catch((err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="admin-products">
      <h2>📦 Quản lý sản phẩm</h2>

      <ProductForm onSubmit={handleAddProduct} />

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
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} VND</td>
                <td>
                  <img src={p.image} alt={p.name} height={40} />
                </td>
                <td>
                  <button>Xoá</button>
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