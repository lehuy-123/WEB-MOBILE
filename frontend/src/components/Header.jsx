import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

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

          {user ? (
            <>
              <Link to="/profile">👤 {user.name || 'Tài khoản'}</Link>

              {/* 🔐 Nếu là admin thì hiện menu quản trị */}
              {user.role === 'admin' && <Link to="/admin">🛠 Quản trị</Link>}

              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
