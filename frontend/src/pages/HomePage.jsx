import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import '../styles/HomePage.css';

function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchProducts({ featured: true }).then(setFeatured);
    // Giả sử có hàm fetchBrands, sẽ dùng tiếp
  }, []);

  return (
    <div className="home-container">
      <section className="banner">
        <h1>Sản phẩm hiện đại</h1>
        <p>Moden & Convenient Products</p>
        <input placeholder="Tìm sản phẩm..." />
        <button>Tìm kiếm</button>
      </section>

      <section className="category-tags">
        <button>Điện thoại</button>
        <button>Laptop</button>
        <button>Âm thanh</button>
        <button>Phụ kiện</button>
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
