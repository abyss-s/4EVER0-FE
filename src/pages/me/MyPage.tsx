import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MyPage: React.FC = () => {
  return (
    <div>
      <h1>마이페이지</h1>
      <nav>
        <Link to="coupons">쿠폰</Link> |<Link to="likes">좋아요</Link> |
        <Link to="events">이벤트</Link> |<Link to="change-plans">요금제 변경</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MyPage;
