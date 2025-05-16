import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Header.css';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowMenu(false); // 👈 đóng menu sau khi logout
    navigate('/login');
  };

  // 👇 Hàm đóng menu sau khi click vào bất kỳ link
  const handleLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-info">
          <span>📍 Hutech E, TP.HCM</span>
          <span>📞 0788 888 999</span>
        </div>
        <div className="header-info">
          <span>📧 minitech@gmail.com</span>
        </div>
      </div>

      <div className="header-main">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            Mini<span>Tech</span>
          </Link>
        </div>

        <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>

        <nav className={`main-nav ${showMenu ? 'show' : ''}`}>
          <Link to="/" onClick={handleLinkClick}>🏠 Trang chủ</Link>
          <Link to="/products" onClick={handleLinkClick}>📱 Sản phẩm</Link>
          <Link to="/cart" onClick={handleLinkClick}>🛒 Giỏ hàng</Link>
          <Link to="/orders" onClick={handleLinkClick}>🧾 Đơn hàng</Link>

          {user ? (
            <>
              <Link to="/profile" onClick={handleLinkClick}>👤 {user.name || 'Tài khoản'}</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={handleLinkClick}>🛠 Quản trị</Link>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" onClick={handleLinkClick}>🔐 Đăng nhập</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
