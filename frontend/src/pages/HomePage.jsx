// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBestSellers } from '../api/productAPI';
import PromotionBanner from '../components/PromotionBanner';
import FlagshipProductList from '../components/FlagshipProductList';
import Footer from '../components/Footer';
import '../styles/HomePage.css';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const renderProductGrid = (products) => (
   <div className="best-seller-list">
  {products.map(p => <ProductCard key={p._id} product={p} />)}
</div>

  );

  return (
    <div className="home-container">
      {/* Banner lớn thay thế hero */}
      <section className="hero-banner-full">
        <img
          src="./images/banner1.png"
          alt="Banner chính"
          className="full-banner-image"
        />
      </section>

      {/* HOT SALE giống CellphoneS */}
      <section className="hot-sale-banner">
        <div className="hot-sale-header">
          <h2>🔥 SẢN PHẨM BÁN CHẠY NHẤT</h2>
         
        </div>
        {loading ? (
          <p style={{ padding: '1rem' }}>Đang tải...</p>
        ) : error ? (
          <p style={{ padding: '1rem' }}>{error}</p>
        ) : (
          renderProductGrid(hotProducts)
        )}
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="flagship-products">
        <FlagshipProductList />
      </section>

      {/* Banner khuyến mãi nhỏ */}
      <PromotionBanner />
    <section className="about-section">
  <div className="about-card centered-box">
    <h3>📍 MiniTech – Uy tín & Chính hãng</h3>
    <p>
      MiniTech chuyên cung cấp <strong>điện thoại</strong>, <strong>máy tính bảng</strong> và <strong>phụ kiện công nghệ</strong> chính hãng từ các thương hiệu hàng đầu như Apple, Samsung, Xiaomi, Oppo,...
    </p>
    <p className="highlight-line">
      ⭐ Cam kết <span>giá tốt</span>, <span>bảo hành 12 tháng</span>, <span>trả góp 0%</span>, <span>giao hàng nhanh toàn quốc</span>.
    </p>
    <div className="about-stats">
      <div>
        <h4>5000+</h4>
        <p>Khách hàng tin dùng</p>
      </div>
      <div>
        <h4>98%</h4>
        <p>Đánh giá 5 sao</p>
      </div>
      <div>
        <h4>24/7</h4>
        <p>Hỗ trợ kỹ thuật</p>
      </div>
    </div>
    <p className="about-note">
      📦 Đặt hàng online – Nhận hàng tại nhà. Trải nghiệm mua sắm tiện lợi và an toàn tại MiniTech!
    </p>
  </div>
</section>





    </div>
  );
}

export default HomePage;
