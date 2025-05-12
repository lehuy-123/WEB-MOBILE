import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const product = {
    name: 'iPhone 15 Pro Max 256GB',
    image: 'https://via.placeholder.com/300x300',
    price: 34999000,
    description: 'iPhone 15 Pro Max là mẫu flagship mạnh nhất của Apple...',
    specs: {
      'Kích thước màn': '6.7 inches',
      'Độ phân giải': '2796 x 1290',
      'Công nghệ màn hình': 'Super Retina XDR OLED',
      'Bộ nhớ trong': '256GB'
    },
    reviews: [
      { user: 'Hải', rating: 5, comment: 'Sản phẩm rất tốt!' }
    ]
  };

  return (
    <div className="product-detail">
      <div className="product-main">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()} VND</p>
          <p>{product.description}</p>
          <div className="product-buttons">
            <button>Thêm giỏ hàng</button>
            <button>Yêu thích</button>
            <button>So sánh</button>
          </div>
        </div>
      </div>

      <div className="product-specs">
        <h3>Thông số kỹ thuật</h3>
        <table>
          <tbody>
            {Object.entries(product.specs).map(([label, value], index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-reviews">
        <h3>Đánh giá sản phẩm</h3>
        {product.reviews.map((review, index) => (
          <div className="review" key={index}>
            <strong>{review.user}</strong> - {review.rating}⭐
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailPage;
