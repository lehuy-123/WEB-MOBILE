import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/HomePage.css';

const FlagshipProductList = () => {
  const [flagships, setFlagships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nếu backend đã có endpoint riêng:
    // fetch('http://localhost:5001/api/products/flagship')

    // Nếu chưa, fetch toàn bộ và filter ở FE:
    fetch('http://localhost:5001/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi khi tải sản phẩm');
        return res.json();
      })
      .then((data) => {
        // Filter chuẩn chỉ lấy flagship === true
        setFlagships(data.filter(p => p.flagship === true));
      })
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
