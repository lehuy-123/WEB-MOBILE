// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Đã đảm bảo import Link
import { fetchBestSellers } from '../api/productAPI';
import PromotionBanner from '../components/PromotionBanner';
import FlagshipProductList from '../components/FlagshipProductList';
import Footer from '../components/Footer';
import '../styles/HomePage.css';
import ProductCard from '../components/ProductCard'; // ⚠️ Thêm dòng này nếu chưa có




function HomePage() {
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    fetchBestSellers().then(setHotProducts);
  }, []);

 const renderProductGrid = (products) => (
  <div className="product-grid">
    {products.map((p) => (
      <ProductCard key={p._id} product={p} />
    ))}
  </div>
);

  return (
    <div className="home-container">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-left">
          <h4 className="hero-subtitle">Sản phẩm hiện đại</h4>
          <h1 className="hero-title">Moden & Convenient<br />Products</h1>
          <div className="search-box">
            <input type="text" placeholder="Tìm sản phẩm..." />
            <button>Tìm kiếm</button>
          </div>
        </div>

        <div className="hero-right">
          <img src="./images/banner.png" alt="Banner" />
        </div>
      </section>

     

      {/* Sản phẩm bán chạy */}
      <section className="featured-products">
        <h2>🔥 Sản phẩm bán chạy</h2>
        {renderProductGrid(hotProducts)}
      </section>

      {/* Sản phẩm flagship */}
      <section className="flagship-products">
        <FlagshipProductList />
      </section>
       {/* Banner khuyến mãi nhỏ */}
      <PromotionBanner />

    
    </div>
  );
}

export default HomePage;
