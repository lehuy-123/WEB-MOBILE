import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <span>Địa chỉ: 123 Lê Lợi, TP.HCM | Hotline: 0123 456 789</span>
        <span>Email: contact@minitech.vn</span>
      </div>
      <div className="header-main">
        <div className="logo">MiniTech</div>
        <nav className="main-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/cart">Giỏ hàng</Link>
          <Link to="/orders">Đơn hàng</Link>
          <Link to="/profile">Tài khoản</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
