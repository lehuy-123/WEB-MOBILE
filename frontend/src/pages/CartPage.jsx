// src/pages/CartPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CartPage.css';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/cart');
      setCart(res.data);
      calculateTotal(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy giỏ hàng:', err);
    }
  };

  const calculateTotal = (cartItems) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(subtotal);
  };

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5001/api/cart/${id}`);
    fetchCart();
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div className="cart-grid">
          {cart.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>{item.price.toLocaleString()} VND</p>
                <p>Số lượng: {item.quantity}</p>
                <button onClick={() => handleRemove(item.productId)}>Xóa</button>
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
