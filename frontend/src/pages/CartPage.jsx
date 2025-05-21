import { useEffect, useState } from 'react';
import '../styles/CartPage.css';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Đọc giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Tính tổng tiền
  const calculateTotal = (cartItems) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
      0
    );
    setTotal(subtotal);
  };

  // Cập nhật số lượng sản phẩm trong giỏ
  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = Math.max(1, isNaN(newQuantity) ? 1 : newQuantity);
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div className="cart-grid">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.image
                  ? `http://localhost:5001/uploads/${item.image}`
                  : '/images/placeholder.png'}
                alt={item.name}
                style={{ width: 100, height: 100, objectFit: 'contain' }}
                onError={e => (e.target.src = '/images/placeholder.png')}
              />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>
                  {item.price
                    ? `${Number(item.price).toLocaleString()} VND`
                    : '0 VND'}
                </p>
                <div>
                  Số lượng:&nbsp;
                  <input
                    type="number"
                    min={1}
                    value={item.quantity || 1}
                    style={{ width: 48 }}
                    onChange={e => handleQuantityChange(item._id, parseInt(e.target.value))}
                  />
                </div>
                <button onClick={() => handleRemove(item._id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h3>Tổng tiền: {total.toLocaleString()} VND</h3>
        <button className="checkout-btn" disabled={cart.length === 0}>
          Tiếp tục đặt hàng
        </button>
      </div>
    </div>
  );
}

export default CartPage;
