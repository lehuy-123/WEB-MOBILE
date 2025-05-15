// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate cho tìm kiếm
import { fetchBestSellers } from '../api/productAPI';
import PromotionBanner from '../components/PromotionBanner';
import FlagshipProductList from '../components/FlagshipProductList';
import Footer from '../components/Footer';
import '../styles/HomePage.css';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái tải
  const [error, setError] = useState(null); // Thêm trạng thái lỗi
  const [searchQuery, setSearchQuery] = useState(''); // Thêm state cho tìm kiếm
  const navigate = useNavigate(); // Dùng để điều hướng khi tìm kiếm

  useEffect(() => {
    setLoading(true);
    fetchBestSellers()
      .then((data) => {
        setHotProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy sản phẩm bán chạy:', err);
        setError('Không thể tải sản phẩm bán chạy');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Điều hướng đến trang tìm kiếm
    }
  };

  const renderProductGrid = (products) => (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((p) => <ProductCard key={p._id} product={p} />)
      ) : (
        <p>Không có sản phẩm nào</p>
      )}
    </div>
  );

  return (
    <div className="home-container">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-left">
          <h4 className="hero-subtitle">Sản phẩm hiện đại</h4>
          <h1 className="hero-title">Moden & Convenient<br />Products</h1>
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Tìm kiếm</button>
          </form>
        </div>

        <div className="hero-right">
          <img src="./images/banner.png" alt="Banner" />
        </div>
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="featured-products">
        <h2>🔥 Sản phẩm bán chạy</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          renderProductGrid(hotProducts)
        )}
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