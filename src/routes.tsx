import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '@/pages/home/Home';
import Attendance from '@/pages/attendance/Attendance';
import Chatbot from '@/pages/chatbot/Chatbot';
import NotFound from '@/pages/common/NotFound';
import HotPlace from '@/pages/hotplace/HotPlace';
import Landing from '@/pages/landing/Landing';
import Login from '@/pages/auth/Login';
import Singup from '@/pages/auth/Signup';
import ChangePlans from '@/pages/me/change-plans/ChangePlans';
import Coupons from '@/pages/me/coupons/Coupons';
import Events from '@/pages/me/events/Events';
import Likes from '@/pages/me/likes/Likes';
import MyPage from '@/pages/me/MyPage';
import Mission from '@/pages/mission/Mission';
import DesignSystemTest from '@/pages/test/DesignSystemTest';
import UBTI from '@/pages/ubti/UBTI';
import UplTuple from '@/pages/upltuple/UplTuple';
import ShareTest from '@/pages/share/ShareTest';
import NaverMap from '@/components/NaverMap/NaverMap';
import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import OAuthCallback from '@/pages/auth/Callback';
import Subscriptions from '@/pages/me/subscriptions/Subscriptions';

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      // index:true 로 "/" 기본페이지 지정
      { index: true, element: <Home /> },

      // 로그인 필수 페이지
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'attendance', element: <Attendance /> },
          { path: 'hotplace', element: <HotPlace /> },
          { path: 'mission', element: <Mission /> },
          { path: 'ubti', element: <UBTI /> },
          { path: 'upltuple', element: <UplTuple /> },
          {
            path: 'me',
            children: [
              { index: true, element: <MyPage /> },
              { path: 'coupons', element: <Coupons /> },
              { path: 'likes', element: <Likes /> },
              { path: 'events', element: <Events /> },
              { path: 'change-plans', element: <ChangePlans /> },
              { path: 'subscriptions', element: <Subscriptions /> },
            ],
          },
        ],
      },

      // 선택형 or  로그인 필요 없는는 페이지
      { path: 'chatbot', element: <Chatbot /> },
      { path: 'landing', element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Singup /> },
      { path: 'authcallback', element: <OAuthCallback /> },

      // 테스트용
      { path: 'design-system', element: <DesignSystemTest /> },
      { path: 'map-test', element: <NaverMap /> },
      { path: 'share-test', element: <ShareTest /> },

      // 404
      { path: '*', element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
