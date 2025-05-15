import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>MiniTech</h2>
          <p>Giải pháp công nghệ hiện đại cho cuộc sống tiện nghi.</p>
        </div>
        <div className="footer-links">
          <a href="#">Trang chủ</a>
          <a href="#">Sản phẩm</a>
          <a href="#">Liên hệ</a>
          <a href="#">Hỗ trợ</a>
        </div>
        <div className="footer-contact">
          <p>📍 123 Lê Lợi, TP.HCM</p>
          <p>📞 0123 456 789</p>
          <p>📧 contact@minitech.vn</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 MiniTech. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
