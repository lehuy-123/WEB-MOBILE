// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import '../styles/CheckoutPage.css';

function CheckoutPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'COD'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đơn hàng đã xác nhận:', form);
    alert('✅ Đặt hàng thành công!');
  };

  return (
    <div className="checkout-container">
      <h2>Thông tin đặt hàng</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Họ và tên</label>
        <input type="text" name="name" required value={form.name} onChange={handleChange} />

        <label>Số điện thoại</label>
        <input type="tel" name="phone" required value={form.phone} onChange={handleChange} />

        <label>Địa chỉ giao hàng</label>
        <textarea name="address" required value={form.address} onChange={handleChange}></textarea>

        <label>Phương thức thanh toán</label>
        <select name="payment" value={form.payment} onChange={handleChange}>
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="BANK">Chuyển khoản ngân hàng</option>
        </select>

        <button type="submit">Xác nhận đặt hàng</button>
      </form>
    </div>
  );
}

export default CheckoutPage;