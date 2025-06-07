import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <section className="min-h-[100dvh] w-full bg-gray-100 text-foreground">
      <div className="mx-auto w-full max-w-[375px] min-h-[100dvh] flex flex-col relative bg-white">
        {/* <TopNav /> */}
        <main className="flex-1 min-h-0 overflow-y-auto px-safe pt-safe pb-safe bg-green-50/30">
          <Outlet />
        </main>
        {/* <BottomNav /> */}
      </div>
    </section>
  );
};

export default Layout;
