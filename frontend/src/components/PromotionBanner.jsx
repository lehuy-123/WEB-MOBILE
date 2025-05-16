// src/components/PromotionBanner.jsx
import React from 'react';
import '../styles/PromotionBanner.css';

const PromotionBanner = () => {
  return (
    <div className="promo-banner-container">
      <img src="./images/banner2.png" alt="Khuyến mãi" className="promo-banner-img" />
      <img src="/images/banner3.png" alt="Giao hàng" className="promo-banner-img" />
    </div>
  );
};

export default PromotionBanner;
