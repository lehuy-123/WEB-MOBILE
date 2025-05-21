import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- import context
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart(); // <--- lấy hàm từ context

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
        <span className="installment-badge">Trả góp 0%</span>
        <img
          src={imageUrl}
          alt={product?.name || 'Sản phẩm'}
          className="product-image"
          onError={e => (e.target.src = '/images/placeholder.png')}
        />
      </div>
      <div className="product-card-body">
        <Link to={`/product/${product?._id}`} className="product-name-link">
          <h3 className="product-name">{product?.name || 'Không rõ tên'}</h3>
        </Link>

        {/* --- Nội dung cứng đẹp, thu hút khách hàng --- */}
        <div className="product-card-info">
          <span>✔️ Bảo hành chính hãng 12 tháng</span>
          <span>🚚 Giao hàng toàn quốc</span>
        </div>
        {/* --- Kết thúc nội dung cứng --- */}

        <div className="price-wrapper">
          {hasValidPrice ? (
            <span className="price">{priceNumber.toLocaleString()} VND</span>
          ) : (
            <span className="price-updating">Giá đang cập nhật</span>
          )}
        </div>

        <div className="product-actions">
          <Link to={`/product/${product?._id}`}>
            <button className="product-button">Xem chi tiết</button>
          </Link>
          <button
            className="cart-button"
            onClick={() => addToCart(product)}
            type="button"
            title="Thêm vào giỏ hàng"
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path d="M6.5 17.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm8 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-11-15h2l2.68 10.39a1.25 1.25 0 0 0 1.21.86h6.97a1.25 1.25 0 0 0 1.21-.92l2.03-7.03H5.21" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
