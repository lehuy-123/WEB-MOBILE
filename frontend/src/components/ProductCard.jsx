import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const hasValidPrice = typeof product.price === 'number';

  // Tạo đường dẫn ảnh đầy đủ nếu có ảnh
  const imageUrl = product.image
    ? `http://localhost:5001/uploads/${product.image}`
    : '/images/placeholder.png';

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-wrapper">
        <img
          src={imageUrl}
          alt={product.name || 'Sản phẩm'}
          className="product-image"
        />
        <span className="discount-badge">Giảm 10%</span>
        <span className="installment-badge">Trả góp 0%</span>
      </Link>

      <div className="product-content">
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name || 'Không rõ tên'}</Link>
        </h3>
        <div className="price-wrapper">
          {hasValidPrice ? (
            <>
              <span className="price">{product.price.toLocaleString()} VND</span>
              <span className="old-price">
                {(product.price * 1.1).toLocaleString()} VND
              </span>
            </>
          ) : (
            <span className="price">Giá đang cập nhật</span>
          )}
        </div>
        <Link to={`/product/${product._id}`}>
          <button className="product-button">Xem chi tiết</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
