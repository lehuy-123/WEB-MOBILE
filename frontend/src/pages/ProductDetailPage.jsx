import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productAPI';
import { Helmet } from 'react-helmet';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p className="loading">Đang tải chi tiết sản phẩm...</p>;

  return (
    <main className="product-detail-container">
      <Helmet>
        <title>{product.name} | MiniTech</title>
        <meta name="description" content={product.description || 'Sản phẩm công nghệ chất lượng'} />
        <meta property="og:image" content={product.image} />
        <meta property="og:title" content={product.name} />
      </Helmet>

      <article className="product-detail-card">
        <figure className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" />
        </figure>

        <section className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">Giá: <strong style={{ color: 'red' }}>{product.price.toLocaleString()} VND</strong></p>
          <p><strong>Thương hiệu:</strong> {product.brand}</p>
          <p><strong>RAM:</strong> {product.ram || 'Đang cập nhật'}</p>
          <p><strong>Bộ nhớ:</strong> {product.storage || 'Đang cập nhật'}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart">🛒 Thêm vào giỏ hàng</button>
        </section>
      </article>
    </main>
  );
}

export default ProductDetailPage;
