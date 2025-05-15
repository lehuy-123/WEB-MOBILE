import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import BannerSlider from '../components/BannerSlider';
import BrandFilter from '../components/BrandFilter';
import '../styles/HomePage.css';

function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchProducts({ featured: true }).then(setFeatured);
  }, []);

  return (
    <div className="home-container">
      <section className="banner-slider">
        <BannerSlider />
      </section>

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

      <section className="category-tags">
        <BrandFilter />
      </section>

      <section className="featured-products">
        <h2>Sản phẩm nổi bật</h2>
        <div className="product-grid">
          {featured.map((p) => (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price.toLocaleString()} VND</p>
              <button>Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
