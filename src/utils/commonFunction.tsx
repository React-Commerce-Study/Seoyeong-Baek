import { useNavigate } from 'react-router-dom';

// 로그아웃
const handleLogout = () => {
  const navigate = useNavigate();

  localStorage.removeItem('token');
  navigate('/');
  window.location.reload();
  // 현재 웹 페이지 다시 로드
};

export { handleLogout };
