import '../styles/ProfilePage.css';

function ProfilePage() {
  return (
    <div className="profile-page">
      <h2>Thông tin cá nhân</h2>

      <form className="profile-form">
        <div className="form-section">
          <label>Họ và tên</label>
          <input type="text" defaultValue="Nguyễn Văn A" />
        </div>
        <div className="form-section">
          <label>Email</label>
          <input type="email" defaultValue="nguyenvana@example.com" disabled />
        </div>
        <div className="form-section">
          <label>Số điện thoại</label>
          <input type="text" defaultValue="0123456789" />
        </div>
        <div className="form-section">
          <label>Địa chỉ</label>
          <input type="text" defaultValue="123 Lê Lợi, Quận 1, TP.HCM" />
        </div>
        <button type="submit" className="update-btn">Cập nhật thông tin</button>
      </form>

      <hr className="divider" />

      <h3>Đổi mật khẩu</h3>
      <form className="password-form">
        <div className="form-section">
          <label>Mật khẩu cũ</label>
          <input type="password" placeholder="Nhập mật khẩu hiện tại" />
        </div>
        <div className="form-section">
          <label>Mật khẩu mới</label>
          <input type="password" placeholder="Mật khẩu mới" />
        </div>
        <div className="form-section">
          <label>Nhập lại mật khẩu mới</label>
          <input type="password" placeholder="Xác nhận mật khẩu mới" />
        </div>
        <button type="submit" className="update-btn">Đổi mật khẩu</button>
      </form>
    </div>
  );
}

export default ProfilePage;
