import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/home/Home';
import Attendance from '@/pages/attendance/Attendance';
import Chatbot from '@/pages/chatbot/Chatbot';
import NotFound from '@/pages/common/NotFound';
import HotPlace from '@/pages/hotplace/HotPlace';
import Landing from '@/pages/landing/Landing';
import Login from '@/pages/login/Login';
import Singup from '@/pages/Signup';
import ChangePlans from '@/pages/me/change-plans/ChangePlans';
import Coupons from '@/pages/me/coupons/Coupons';
import Events from '@/pages/me/events/Events';
import Likes from '@/pages/me/likes/Likes';
import MyPage from '@/pages/me/MyPage';
import Mission from '@/pages/mission/Mission';
import DesignSystemTest from '@/pages/test/DesignSystemTest';
import UBTI from '@/pages/ubti/UBTI';
import UplTuple from '@/pages/upltuple/UplTuple';
import NaverMap from '@/components/NaverMap/NaverMap';

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      // index:true 로 "/" 기본페이지 지정
      { index: true, element: <Home /> },

      // 일반 페이지
      { path: 'attendance', element: <Attendance /> },
      { path: 'chatbot', element: <Chatbot /> },
      { path: 'hotplace', element: <HotPlace /> },
      { path: 'landing', element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Singup /> },
      { path: 'mission', element: <Mission /> },
      { path: 'ubti', element: <UBTI /> },
      { path: 'upltuple', element: <UplTuple /> },

      // 마이 페이지
      {
        path: 'me',
        element: <MyPage />,
        children: [
          { path: 'coupons', element: <Coupons /> },
          { path: 'likes', element: <Likes /> },
          { path: 'events', element: <Events /> },
          { path: 'change-plans', element: <ChangePlans /> },
        ],
      },

      // 테스트
      { path: 'design-system', element: <DesignSystemTest /> },
      { path: 'map-test', element: <NaverMap /> },

      // 404
      { path: '*', element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
