import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const Layout = (): React.ReactElement => {
  return (
    <section className="relative min-h-[100dvh] w-full bg-background text-foreground pt-[56px] pb-[56px]">
      <TopNav />
      <main
        className="mx-auto w-full max-w-[420px] px-6 py-4 overflow-y-auto"
        style={{
          height: 'calc(100dvh - 112px)',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <Outlet />
      </main>
      <BottomNav />
    </section>
  );
};

export default Layout;
