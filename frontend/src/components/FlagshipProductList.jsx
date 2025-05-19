import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/FlagshipProductList.css';

const FlagshipProductList = () => {
  const [flagships, setFlagships] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(res => res.ok ? res.json() : Promise.reject('Lỗi khi tải sản phẩm'))
      .then(data => setFlagships(data.filter(p => p.flagship)))
      .catch(() => setError('Không thể tải danh sách flagship'));
  }, []);

  return (
    <section className="flagship-section">
      <h2 className="section-title">🚀 Flagship nổi bật</h2>
      {error ? (
        <p className="error-text">{error}</p>
      ) : flagships.length === 0 ? (
        <p className="no-products">Chưa có sản phẩm flagship nào.</p>
      ) : (
        <div className="horizontal-scroll">
          {flagships.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FlagshipProductList;
