import { useCallback } from 'react';
import { logout } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error('로그아웃 실패', e);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-6">홈</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        로그아웃
      </button>
    </div>
  );
};

export default Home;
