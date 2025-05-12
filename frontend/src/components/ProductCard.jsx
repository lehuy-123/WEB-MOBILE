import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price.toLocaleString()} VND</p>
      <Link to={`/product/${product._id}`}>
        <button className="product-button">Xem chi tiết</button>
      </Link>
    </div>
  );
}

export default ProductCard;
