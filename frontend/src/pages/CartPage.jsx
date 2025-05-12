import '../styles/CartPage.css';

function CartPage() {
  const cartItems = [
    { _id: 1, name: "iPhone 15", image: "https://via.placeholder.com/200", price: 24990000, qty: 1 },
    { _id: 2, name: "Samsung S24", image: "https://via.placeholder.com/200", price: 22990000, qty: 2 }
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h2>Thông tin giỏ hàng</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td className="product-info">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </td>
              <td>{item.price.toLocaleString()} đ</td>
              <td>{item.qty}</td>
              <td>{(item.qty * item.price).toLocaleString()} đ</td>
              <td><button className="delete-btn">X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <p><strong>Tổng tiền:</strong> {total.toLocaleString()} đ</p>
        <button className="checkout-btn">Tiến hành thanh toán</button>
      </div>
    </div>
  );
}

export default CartPage;
