import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  // Lấy thông tin user từ token (cả login thường lẫn login Google)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
        });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowMenu(false);
    navigate('/login');
  };

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
          <Link to="/" onClick={handleLinkClick}> Trang chủ</Link>
          <Link to="/products" onClick={handleLinkClick}> Sản phẩm</Link>
          <Link to="/cart" onClick={handleLinkClick}> Giỏ hàng</Link>
          <Link to="/orders" onClick={handleLinkClick}> Đơn hàng</Link>

          {user ? (
            <>
              <Link to="/profile" onClick={handleLinkClick}>
                👤 {user.name || 'Tài khoản'}
              </Link>
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
