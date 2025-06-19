import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialSlide from './TutorialSlide';
import { BellRing, MapPinCheckInside } from 'lucide-react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import TutorialStep2Background from './TutorialStep2Background';
import { IMAGES } from '@/constant/imagePath';
import BackButton from '@/pages/intro/BackButton';

const BottomNavHint = ({
  left,
  text,
  align = 'center',
  rotate = 45,
}: {
  left: number | string;
  text: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  rotate?: number;
}) => {
  const alignment =
    align === 'left'
      ? 'items-start text-left'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-center text-center';

  return (
    <div className="absolute bottom-[37px] z-30 pointer-events-none" style={{ left }}>
      <div className={`flex flex-col ${alignment}`}>
        <p
          className={`text-[11px] text-white leading-tight whitespace-pre-line font-medium ${
            align === 'left'
              ? 'mr-1'
              : align === 'center'
                ? 'ml-4'
                : align === 'right'
                  ? 'ml-10'
                  : ''
          }`}
        >
          {text}
        </p>
        <ArrowRightIcon
          className="ml-4 w-5 h-5 mb-1 text-white opacity-90"
          style={{ transform: `rotate(${rotate}deg)` }}
        />
      </div>
    </div>
  );
};

const Tutorial = () => {
  const [step, setStep] = useState(1);
  const [shouldShow, setShouldShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
    const hasLoggedIn = localStorage.getItem('hasLoggedIn') === 'true';

    if (hasSeenTutorial || hasLoggedIn) {
      navigate('/home', { replace: true });
    } else {
      setShouldShow(true);
    }
  }, []);

  if (!shouldShow) return null;

  const goToHome = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    navigate('/home');
  };
  const handleBack = () => {
    if (step === 1) {
      navigate('/intro');
    } else {
      setStep((prev) => prev - 1);
    }
  };

  if (step === 1) {
    return (
      <TutorialSlide
        title="시작하기 전에"
        description={`더 나은 서비스 이용을 위해\n동의가 필요한 내용을 확인해주세요.`}
        iconList={[
          {
            icon: <MapPinCheckInside className="text-green-500" />,
            text: (
              <>
                현재 <span className="font-semibold">위치</span>를 사용한 다양한 정보를
                <br />
                보다 정확하게 제공합니다.
              </>
            ),
          },
          {
            icon: <BellRing className="text-green-500" />,
            text: (
              <>
                <span className="font-semibold">이벤트·혜택 </span>정보를 놓치지 않도록
                <br />
                프로모션 정보를 제공합니다.
              </>
            ),
          },
        ]}
        buttonText="다음"
        onButtonClick={() => setStep(2)}
        onBackClick={handleBack}
      />
    );
  }

  if (step === 2) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center">
          <TutorialStep2Background />
        </div>

        <div className="absolute inset-0 z-10 bg-black/70 text-white flex justify-center overflow-y-auto">
          <div className="w-full h-screen px-6 pt-[80px] pb-6 text-center flex flex-col justify-between max-w-[420px] mx-auto relative">
            <div className="absolute top-5 left-6 z-20">
              <BackButton onClick={handleBack} color="white" />
            </div>

            <div className="flex flex-col mt-30 items-center relative">
              <div className="relative w-[180px] mt-10">
                <img
                  src={IMAGES.bubble}
                  alt="말풍선"
                  className="absolute -top-16 -right-15 w-22 h-auto"
                />
                <div className="absolute -top-13 -right-14 w-20 h-10 flex items-center justify-center caption-1 text-black text-center pointer-events-none">
                  무너 등장
                </div>

                <img
                  src={IMAGES.MOONER['mooner-share']}
                  alt="무너즈 튜토리얼 일러스트"
                  className="w-full h-auto mb-10"
                />
              </div>
              <button
                onClick={goToHome}
                className="py-3 px-6 mt-11 bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-black rounded-full font-semibold text-sm transition-colors"
              >
                MoonoZ 시작하기 →
              </button>
            </div>

            <div className="relative w-full h-[0px] mx-auto">
              <BottomNavHint
                left="1%"
                align="left"
                rotate={-135}
                text={
                  <>
                    출석 및 <span className="text-green-300">미션</span>
                    {'\n'}이번 달 <span className="text-green-300">유플튜플</span>
                  </>
                }
              />
              <BottomNavHint
                left="19%"
                align="center"
                rotate={-90}
                text={
                  <>
                    {'\n'} 요금제 궁금할 땐 {'\n'}{' '}
                    <span className="text-green-300">무너 챗봇 {'\n'}타코시그널</span>
                  </>
                }
              />
              <BottomNavHint
                left="57%"
                align="center"
                rotate={-90}
                text={
                  <>
                    MZ 취향 놀이터
                    {'\n'} <span className="text-green-300">MZ 픽</span> 핫플
                    {'\n'} <span className="text-green-300">쿠폰</span> BEST 3
                  </>
                }
              />
              <BottomNavHint left="76%" align="right" rotate={-45} text={<span>내 정보</span>} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Tutorial;
