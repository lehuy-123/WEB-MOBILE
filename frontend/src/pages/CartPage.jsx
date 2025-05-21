import { useEffect, useState } from 'react';
import '../styles/CartPage.css';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Đọc giỏ hàng từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    setTotal(subtotal);
  };

  // Cập nhật số lượng sản phẩm
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
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
              <img src={`http://localhost:5001/uploads/${item.image}`} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>{item.price ? item.price.toLocaleString() : 0} VND</p>
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
        <button className="checkout-btn">Tiếp tục đặt hàng</button>
      </div>
    </div>
  );
}

export default CartPage;
