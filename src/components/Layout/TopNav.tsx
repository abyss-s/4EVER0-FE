import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/Button';

const TopNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const showBack = pathname !== '/';

  return (
    <header className="fixed top-0 left-0 right-0 mx-auto max-w-[375px] w-full bg-[var(--color-background)] z-20 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={() => navigate(-1)}>
              <ChevronLeftIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
            </button>
          )}
          <Link to="/">
            <img src="/logo.svg" alt="MoonoZ 로고" className="w-16 cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
              로그아웃
            </Button>
          ) : (
            <Button variant="login" size="sm" onClick={() => setIsLoggedIn(true)}>
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
