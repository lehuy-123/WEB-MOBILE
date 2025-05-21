import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [selected, setSelected] = useState([]);

  // Giữ trạng thái tick
  useEffect(() => {
    if (cart.length === 0) setSelected([]);
    else if (selected.length > 0) setSelected(selected.filter(id => cart.some(item => item._id === id)));
  }, [cart]);

  // Nếu chưa từng chọn, mặc định chọn hết
  useEffect(() => {
    if (cart.length > 0 && selected.length === 0) {
      setSelected(cart.map((item) => item._id));
    }
  }, [cart]);

  // Tổng tiền: chỉ tính các sản phẩm đã tick, dùng đúng field price hoặc lấy từ variant
  const total = cart
    .filter(item => selected.includes(item._id))
    .reduce((sum, item) => {
      let price =
        Number(item.price) > 0
          ? Number(item.price)
          : item.variants && item.variants[0]?.price
            ? Number(item.variants[0].price)
            : 0;
      return sum + price * (item.quantity || 1);
    }, 0);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };





  // Hàm lấy giá đúng cho từng item (ưu tiên variant.price, rồi item.price)
const getItemPrice = (item) => {
  if (item.variant && typeof item.variant.price === 'number') {
    return item.variant.price;
  }
  if (typeof item.price === 'number') {
    return item.price;
  }
  // fallback nếu không có, có thể lấy variant đầu tiên (nếu cần)
  return 0;
};







  const handleSelectAll = () => {
    if (selected.length === cart.length) setSelected([]);
    else setSelected(cart.map((item) => item._id));
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div className="cart-list">
          {/* Header */}
          <div className="cart-row cart-row-header">
            <div className="cart-col tick">
              <input
                type="checkbox"
                checked={selected.length === cart.length && cart.length > 0}
                onChange={handleSelectAll}
                style={{ transform: 'scale(1.28)' }}
                title="Chọn tất cả"
              />
            </div>
            <div className="cart-col img"></div>
            <div className="cart-col info">Sản phẩm</div>
            <div className="cart-col qty">Số lượng</div>
            <div className="cart-col remove"></div>
          </div>
          {/* List sản phẩm */}
          {cart.map((item) => (
            <div className="cart-row" key={item._id}>
              <div className="cart-col tick">
                <input
                  type="checkbox"
                  checked={selected.includes(item._id)}
                  onChange={() => handleSelect(item._id)}
                  style={{ transform: 'scale(1.15)' }}
                  title="Chọn sản phẩm này"
                />
              </div>
              <div className="cart-col img">
                <img
                  src={item.image ? `http://localhost:5001/uploads/${item.image}` : '/images/placeholder.png'}
                  alt={item.name}
                  onError={e => (e.target.src = '/images/placeholder.png')}
                />
              </div>
          <div className="cart-col info">
  <h4>{item.name}</h4>
  {(item.variant?.color || item.variant?.storage || item.variant?.ram) && (
    <div className="variant-detail">
      {item.variant?.color && <span>Màu: <b>{item.variant.color}</b></span>}
      {item.variant?.storage && <span style={{ marginLeft: 8 }}>Dung lượng: <b>{item.variant.storage}</b></span>}
      {item.variant?.ram && <span style={{ marginLeft: 8 }}>RAM: <b>{item.variant.ram}</b></span>}
    </div>
  )}
<span className="price-label">
  {getItemPrice(item) > 0
    ? `${getItemPrice(item).toLocaleString()} VND`
    : '0 VND'}
</span>
</div>



              <div className="cart-col qty">
                <input
                  type="number"
                  min={1}
                  value={item.quantity || 1}
                  onChange={e => updateQuantity(item._id, parseInt(e.target.value))}
                />
              </div>
              <div className="cart-col remove">
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 11v4M14 11v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5 6l1-3h12l1 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h3>
          Tổng tiền: <span style={{ color: "#e43f3f" }}>{total.toLocaleString()} VND</span>
        </h3>
        <button className="checkout-btn" disabled={selected.length === 0 || total === 0}>
          Tiếp tục đặt hàng
        </button>
      </div>
    </div>
  );
}

export default CartPage;
