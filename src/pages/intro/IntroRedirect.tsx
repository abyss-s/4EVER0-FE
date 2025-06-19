import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
    const hasLoggedIn = localStorage.getItem('hasLoggedIn') === 'true';

    if (!hasSeenTutorial && !hasLoggedIn) {
      navigate('/intro', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  return null;
};

export default IntroRedirect;
