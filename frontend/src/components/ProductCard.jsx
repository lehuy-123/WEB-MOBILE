import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  // Ưu tiên lấy product.price, nếu không thì lấy giá từ variant đầu tiên
  const priceNumber = Number(
    product?.price ??
    (product?.variants && product.variants[0]?.price)
  );
  const hasValidPrice = !isNaN(priceNumber) && priceNumber > 0;

  const imageUrl = product?.image
    ? `http://localhost:5001/uploads/${product.image}`
    : '/images/placeholder.png';

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <div className="badge-row">
          <span className="discount-badge">Giảm 10%</span>
          <span className="installment-badge">Trả góp 0%</span>
        </div>
        <img
          src={imageUrl}
          alt={product?.name || 'Sản phẩm'}
          className="product-image"
        />
      </div>

      <h3 className="product-name">
        <Link to={`/product/${product?._id}`}>
          {product?.name || 'Không rõ tên'}
        </Link>
      </h3>

      <div className="price-wrapper">
        {hasValidPrice ? (
          <>
            <span className="price">
              {priceNumber.toLocaleString()} VND
            </span>
            <span className="old-price">
              {(priceNumber * 1.1).toLocaleString()} VND
            </span>
          </>
        ) : (
          <span className="price-updating">
            Giá đang cập nhật
          </span>
        )}
      </div>

      <Link to={`/product/${product?._id}`}>
        <button className="product-button">Xem chi tiết</button>
      </Link>
    </div>
  );
}

export default ProductCard;
