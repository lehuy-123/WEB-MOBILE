import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, fetchProductReviews } from '../api/productAPI';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProductDetail(id).then(setProduct);
    fetchProductReviews(id).then(setReviews);
  }, [id]);

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <img src={product.image} alt={product.name} />
        <div className="info">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()} VND</p>
          <p>{product.description}</p>
          <button>Thêm vào giỏ hàng</button>
        </div>
      </div>

      <div className="specs">
        <h3>Thông số kỹ thuật</h3>
        <ul>
          {product.specs?.map((s, idx) => (
            <li key={idx}><b>{s.key}:</b> {s.value}</li>
          ))}
        </ul>
      </div>

      <div className="reviews">
        <h3>Đánh giá sản phẩm ({reviews.length})</h3>
        {reviews.map((r, idx) => (
          <div key={idx} className="review">
            <p><strong>{r.user}</strong>: {r.comment}</p>
            <span>⭐ {r.rating}/5</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailPage;
