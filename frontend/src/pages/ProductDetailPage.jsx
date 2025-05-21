import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productAPI';
import { Helmet } from 'react-helmet';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Theo dõi ảnh đang chọn
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
          setSelectedImageIndex(0); // Đặt lại chỉ số ảnh khi chọn sản phẩm
        }
      })
      .catch((err) => {
        console.error('Lỗi khi tải sản phẩm:', err);
      });
  }, [id]);

  if (!product) return <p className="loading">Đang tải chi tiết sản phẩm...</p>;

  // Xử lý khi chọn biến thể
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0); // Đặt lại chỉ số ảnh khi chọn biến thể mới
    setImageError(false); // Reset lỗi ảnh
  };

  // Xử lý khi chọn ảnh
  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
    setImageError(false); // Reset lỗi ảnh khi chọn ảnh mới
  };

  // Định dạng nhãn cho biến thể
  const getVariantLabel = (variant) => {
    const parts = [
      variant.color || 'Không xác định',
      variant.ram || '',
      variant.storage || ''
    ].filter(part => part);
    return parts.join(', ');
  };

  // Xác định URL ảnh
  const getImageUrl = () => {
    const images = selectedVariant?.images && Array.isArray(selectedVariant.images) && selectedVariant.images.length > 0
      ? selectedVariant.images
      : (product.image ? [product.image] : []);
    
    if (images.length === 0) {
      return 'https://via.placeholder.com/300x300?text=No+Image'; // Placeholder ảnh
    }

    const imagePath = images[selectedImageIndex] || images[0];
    // Đảm bảo URL đúng với cấu trúc backend
    return imagePath.startsWith('http') ? imagePath : `http://localhost:5001/uploads/${imagePath}`;
  };

  // Xử lý lỗi tải ảnh
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <main className="product-detail-container">
      <Helmet>
        <title>{product.name} | MiniTech</title>
        <meta name="description" content={product.description || 'Sản phẩm công nghệ chất lượng'} />
        <meta
          property="og:image"
          content={imageError ? 'https://via.placeholder.com/300x300?text=No+Image' : getImageUrl()}
        />
        <meta property="og:title" content={product.name} />
      </Helmet>

      <article className="product-detail-card">
        <figure className="product-image-wrapper">
          {imageError ? (
            <div className="no-image">Không có ảnh sản phẩm</div>
          ) : (
            <img
              src={getImageUrl()}
              alt={product.name}
              className="product-image"
              onError={handleImageError}
            />
          )}
          {/* Hiển thị danh sách ảnh thu nhỏ nếu có nhiều ảnh */}
          {selectedVariant?.images && selectedVariant.images.length > 1 && (
            <div className="image-thumbnails">
              {selectedVariant.images.map((img, index) => (
                <img
                  key={index}
                  src={img.startsWith('http') ? img : `http://localhost:5001/uploads/${img}`}
                  alt={`${product.name} thumbnail ${index}`}
                  className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                  style={{ width: '50px', height: '50px', cursor: 'pointer', margin: '5px' }}
                />
              ))}
            </div>
          )}
        </figure>

        <section className="product-info">
          <h1>{product.name}</h1>

          {/* Dropdown chọn biến thể */}
          {product.variants && product.variants.length > 0 ? (
            <div className="variant-selector">
              <label><strong>Chọn biến thể:</strong></label>
              <select
                value={selectedVariant ? getVariantLabel(selectedVariant) : ''}
                onChange={(e) => {
                  const selected = product.variants.find(
                    (v) => getVariantLabel(v) === e.target.value
                  );
                  handleVariantChange(selected);
                }}
              >
                {product.variants.map((variant, index) => (
                  <option key={index} value={getVariantLabel(variant)}>
                    {getVariantLabel(variant)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p>Không có biến thể nào</p>
          )}

          <p className="product-price">
            Giá: <strong style={{ color: 'red' }}>
              {selectedVariant && typeof selectedVariant.price === 'number'
                ? selectedVariant.price.toLocaleString() + ' VND'
                : 'Chưa cập nhật'}
            </strong>
          </p>
          <p><strong>Thương hiệu:</strong> {product.brand || 'Đang cập nhật'}</p>
          <p><strong>RAM:</strong> {selectedVariant?.ram || 'Đang cập nhật'}</p>
          <p><strong>Bộ nhớ:</strong> {selectedVariant?.storage || 'Đang cập nhật'}</p>
          <p><strong>Màu sắc:</strong> {selectedVariant?.color || 'Đang cập nhật'}</p>
          <p><strong>Tồn kho:</strong> {selectedVariant?.quantity || 0} sản phẩm</p>
          <p className="product-description">{product.description || 'Không có mô tả'}</p>
          <button className="add-to-cart">🛒 Thêm vào giỏ hàng</button>
        </section>
      </article>
    </main>
  );
}

export default ProductDetailPage;