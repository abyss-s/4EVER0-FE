import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/provider/ThemeProvider';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const Layout = (): React.ReactElement => {
  return (
    <ThemeProvider>
      <section className="min-h-[100dvh] w-full bg-[var(--color-background)] text-[var(--color-foreground)]">
        <div className="mx-auto w-full max-w-[375px] min-h-[100dvh] relative">
          <TopNav />
          <main className="pt-[60px] pb-[64px] px-safe">
            <Outlet />
          </main>
          <BottomNav />
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Layout;
