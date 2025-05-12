import '../styles/LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Đăng nhập</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>
          <button type="submit" className="login-btn">Đăng nhập</button>
        </form>
        <p className="redirect">Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
