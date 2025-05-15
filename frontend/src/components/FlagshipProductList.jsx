// src/components/FlagshipProductList.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/HomePage.css';

const FlagshipProductList = () => {
  const [flagships, setFlagships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/products?category=flagship')
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi khi tải flagship products');
        return res.json();
      })
      .then((data) => setFlagships(data))
      .catch((err) => {
        console.error(err);
        setError('Không thể tải danh sách flagship');
      });
  }, []);

  return (
    <div className="flagship-section">
      <h2>🚀 Flagship nổi bật</h2>
      {error ? (
        <p className="error-text">{error}</p>
      ) : flagships.length === 0 ? (
        <p className="no-products">Chưa có sản phẩm flagship nào.</p>
      ) : (
        <div className="horizontal-scroll">
          {flagships.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagshipProductList;
