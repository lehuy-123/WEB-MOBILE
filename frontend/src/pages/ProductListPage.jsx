import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import '../styles/ProductListPage.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      }
    };
    loadProducts();
  }, []);

  const handleSearch = () => {
    const results = products.filter(p =>
      p.name?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="product-list-container">
      <h2 className="page-title">🛍️ Danh sách sản phẩm</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <div key={p._id || p.id} className="product-card">
              {p.image ? (
                <img
                  src={`http://localhost:5001/uploads/${p.image}`}
                  alt={p.name}
                  className="product-image"
                />
              ) : (
                <div className="no-image">Không có ảnh</div>
              )}
              <h4>{p.name}</h4>
              <p>
                {typeof p.price === 'number'
                  ? `${p.price.toLocaleString()} VND`
                  : 'Chưa có giá'}
              </p>
              <button>Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
