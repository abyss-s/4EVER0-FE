import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '@/pages/home/Home';
import Chatbot from '@/pages/chatbot/Chatbot';
import NotFound from '@/pages/common/NotFound';
import HotPlace from '@/pages/hotplace/HotPlace';
import Login from '@/pages/auth/Login';
import Singup from '@/pages/auth/Signup';
import Plan from '@/pages/plan/Plan';
import Coupons from '@/pages/me/coupons/Coupons';
import Events from '@/pages/me/events/Events';
import Likes from '@/pages/me/likes/Likes';
import MyPage from '@/pages/me/MyPage';
import Mission from '@/pages/mission/Mission';
import DesignSystemTest from '@/pages/test/DesignSystemTest';
import UBTI from '@/pages/ubti/UBTI';
import UBTIShare from '@/pages/ubti/SharePage';
import UplTuple from '@/pages/upltuple/UplTuple';
import ShareTest from '@/pages/share/ShareTest';
import NaverMap from '@/components/NaverMap/NaverMap';
import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import OAuthCallback from '@/pages/auth/Callback';
import Subscriptions from '@/pages/me/subscriptions/Subscriptions';
import Intro from '@/pages/intro/Intro';
import Tutorial from '@/pages/intro/Tutorial';
import IntroRedirect from '@/pages/intro/IntroRedirect';
import PlanDetail from './pages/plan/PlanDetail';
import MoonerZone from '@/pages/me/MoonerZone';

const routes: RouteObject[] = [
  {
    path: '/intro',
    element: <Intro />,
  },
  {
    path: '/tutorial',
    element: <Tutorial />,
  },
  {
    path: '/',
    element: <IntroRedirect />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home', element: <Home /> },

      // 로그인 필수 페이지
      {
        element: <ProtectedRoute />,
        children: [
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
              { path: 'subscriptions', element: <Subscriptions /> },
              { path: 'mooner-zone', element: <MoonerZone /> },
            ],
          },
          {},
        ],
      },

      // 선택형 or  로그인 필요 없는 페이지
      { path: 'chatbot', element: <Chatbot /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Singup /> },
      { path: 'authcallback', element: <OAuthCallback /> },
      { path: 'plans', element: <Plan /> },
      { path: 'plans/:id', element: <PlanDetail /> },
      { path: 'share/:id', element: <UBTIShare /> },

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
