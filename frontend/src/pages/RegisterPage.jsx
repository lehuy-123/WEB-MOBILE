import '../styles/RegisterPage.css';

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Đăng ký tài khoản</h2>
        <form>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ tên" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>
          <div className="form-group">
            <label>Nhập lại mật khẩu</label>
            <input type="password" placeholder="Xác nhận mật khẩu" />
          </div>
          <button type="submit" className="register-btn">Đăng ký</button>
        </form>
        <p className="redirect">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
      </div>
    </div>
  );
}

export default RegisterPage;
