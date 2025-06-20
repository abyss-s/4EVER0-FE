import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Intro = () => {
  const navigate = useNavigate();

  const handleEnd = () => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
    const hasLoggedIn = localStorage.getItem('hasLoggedIn') === 'true';

    if (!hasSeenTutorial && !hasLoggedIn) {
      navigate('/tutorial');
    } else {
      navigate('/home');
    }
  };

  useEffect(() => {}, []);

  return (
    <video
      src="/videos/moonointro.MP4"
      autoPlay
      muted
      playsInline
      onEnded={handleEnd}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] h-full object-cover z-50"
    />
  );
};

export default Intro;
