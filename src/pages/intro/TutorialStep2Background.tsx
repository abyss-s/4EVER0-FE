import Home from '@/pages/home/Home';
import TopNav from '@/components/Layout/TopNav';
import BottomNav from '@/components/Layout/BottomNav';

const TutorialStep2Background = () => {
  return (
    <div className="relative w-full h-screen max-w-[420px] mx-auto bg-background text-foreground">
      <TopNav />
      <main className="pt-[56px] pb-[56px] px-6">
        <Home />
      </main>
      <BottomNav />
    </div>
  );
};

export default TutorialStep2Background;
