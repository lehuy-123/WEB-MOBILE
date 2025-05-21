import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // ✅ Chuyển hướng về trang chủ (hoặc bất cứ đâu bạn muốn)
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div style={{textAlign:'center', marginTop:40, fontSize:18, color:'#1976d2'}}>
      Đang xác thực Google, vui lòng chờ...
    </div>
  );
}

export default AuthCallback;
