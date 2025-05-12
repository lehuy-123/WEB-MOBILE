import { useEffect, useState } from 'react';

import { getCart, updateCartItem, deleteCartItem, getCartTotal } from '../api/cardAPI';

import '../styles/CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    const items = await getCart();
    setCartItems(items);
    const t = await getCartTotal();
    setTotal(t);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (itemId, qty) => {
    await updateCartItem(itemId, qty);
    loadCart();
  };

  const handleRemove = async (itemId) => {
    await deleteCartItem(itemId);
    loadCart();
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
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
                  <td><img src={item.image} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    />
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  <td>
                    <button onClick={() => handleRemove(item._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p><strong>Tổng cộng:</strong> {total.toLocaleString()} VND</p>
            <button className="checkout-btn" onClick={() => window.location.href = '/checkout'}>
              Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
