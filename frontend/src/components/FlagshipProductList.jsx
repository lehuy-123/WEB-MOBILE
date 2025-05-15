// src/components/FlagshipProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import ProductCard from './ProductCard';

const FlagshipProductList = () => {
  const [flagships, setFlagships] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products?category=flagship')
      .then(res => res.json())
      .then(setFlagships)
      .catch(console.error);
  }, []);

  return (
    <div className="flagship-section">
      <h2>🚀 Flagship nổi bật</h2>
      <div className="horizontal-scroll">
        {flagships.map(product => (
          <ProductCard key={product._id} product={product} />))}
          </div>
          </div>
  );
};

export default FlagshipProductList;
