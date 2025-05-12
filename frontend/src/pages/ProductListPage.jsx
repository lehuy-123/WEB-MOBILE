import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import '../styles/ProductListPage.css';


function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({ keyword, sort });
      setProducts(data);
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [keyword, sort]);

  return (
    <div className="product-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="price">Giá tăng dần</option>
          <option value="-price">Giá giảm dần</option>
          <option value="rating">Đánh giá cao</option>
          <option value="newest">Mới nhất</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price.toLocaleString()} VND</p>
              <button>Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
