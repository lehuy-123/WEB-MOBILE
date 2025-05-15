import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="discount-badge">Giảm 10%</span>
        <span className="installment-badge">Trả góp 0%</span>
      </Link>

      <div className="product-content">
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <div className="price-wrapper">
          <span className="price">{product.price.toLocaleString()} VND</span>
          <span className="old-price">
            {(product.price * 1.1).toLocaleString()} VND
          </span>
        </div>
        <Link to={`/product/${product._id}`}>
          <button className="product-button">Xem chi tiết</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
