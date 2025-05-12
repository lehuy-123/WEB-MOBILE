import { useState } from 'react';
import { createOrder } from '../api/oderAPI';

import '../styles/CheckoutPage.css';

function CheckoutPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(form);
      setMessage('🎉 Đặt hàng thành công!');
      setForm({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cod',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Có lỗi xảy ra khi đặt hàng.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Thông tin thanh toán</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Họ tên người nhận" value={form.name} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Địa chỉ giao hàng" value={form.address} onChange={handleChange} required />

        <label>Phương thức thanh toán:</label>
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
          <option value="cod">Thanh toán khi nhận hàng (COD)</option>
          <option value="bank">Chuyển khoản ngân hàng</option>
        </select>

        <button type="submit">Xác nhận đặt hàng</button>
      </form>

      {message && <p className="checkout-message">{message}</p>}
    </div>
  );
}

export default CheckoutPage;
