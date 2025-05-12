import '../styles/CheckoutPage.css';

function CheckoutPage() {
  return (
    <div className="checkout-page">
      <h2>Thanh toán đơn hàng</h2>
      <form className="checkout-form">
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" placeholder="Nhập họ và tên" />
        </div>
        <div className="form-group">
          <label>Địa chỉ giao hàng</label>
          <input type="text" placeholder="Số nhà, đường, phường, quận..." />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="text" placeholder="0123 456 789" />
        </div>
        <div className="form-group">
          <label>Phương thức thanh toán</label>
          <select>
            <option>Thanh toán khi nhận hàng (COD)</option>
            <option>Chuyển khoản ngân hàng</option>
          </select>
        </div>
        <button type="submit" className="confirm-button">Xác nhận đặt hàng</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
