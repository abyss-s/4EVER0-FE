import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialSlide from './TutorialSlide';
import { BellRing, MapPinCheckInside } from 'lucide-react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import TutorialStep2Background from './TutorialStep2Background';
import { IMAGES } from '@/constant/imagePath';
import BackButton from '@/pages/intro/BackButton';
import { Button } from '@/components/Button';

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
  return (
    <div className="absolute bottom-[37px] z-30 pointer-events-none" style={{ left }}>
      <div className={`flex flex-col items-center`}>
        <p
          className={`text-[clamp(9px,3vw,12px)] text-white leading-tight whitespace-pre-line font-medium ${
            align === 'left'
              ? 'ml-2'
              : align === 'center'
                ? 'ml-4'
                : align === 'right'
                  ? 'ml-3'
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

        <div className="absolute inset-0 z-10 bg-black/75 text-white flex justify-center overflow-y-auto">
          <div className="w-full h-screen px-6 pt-[80px] pb-6 text-center flex flex-col justify-between max-w-full sm:max-w-[420px] md:max-w-[640px] lg:max-w-[768px] mx-auto relative">
            <div className="absolute top-5 left-6 z-20">
              <BackButton onClick={handleBack} color="white" />
            </div>

            <div className="flex flex-col mt-28 items-center relative">

              <div className="relative w-[180px] mt-10">
                <img
                  src={IMAGES.bubble}
                  alt="말풍선"
                  className="absolute -top-16 -right-15 w-22 h-auto"
                />
                <div className="absolute -top-13 -right-14 w-20 h-10 flex items-center justify-center caption-1 text-black font-semibold text-center pointer-events-none">
                  무너 등장
                </div>

                <img
                  src={IMAGES.MOONER['mooner-share']}
                  alt="무너즈 튜토리얼 일러스트"
                  className="w-full h-auto mb-10"
                />
              </div>
              <Button
                onClick={() => setStep(3)}
                variant="default"
                size="default"
                className="mt-4 bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-black text-sm font-semibold"
              >
                다음 →

              </Button>
            </div>

            <div className="relative w-full h-[0px] mx-auto translate-y-[14px]">
              <BottomNavHint
                left="-6%"
                align="left"
                rotate={-135}
                text={
                  <>
                    출석 및 <span className="text-green-300">미션</span>
                    {'\n'}이번 달 <span className="text-green-300">유플투쁠</span>
                  </>
                }
              />
              <BottomNavHint
                left="18%"
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
                left="59%"
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
              <BottomNavHint left="85%" align="right" rotate={-45} text={<span>내 정보</span>} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center">
          <TutorialStep2Background />
        </div>

        <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm" />

        <div
          className="absolute z-20 pointer-events-none w-full flex justify-center"
          style={{
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative w-[390px] h-[290px] md:h-[140px] rounded-[30px]  -translate-y-5">
            <div className="absolute inset-0 rounded-[30px] border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)] animate-pulse" />

            <div
              className="absolute inset-0 w-full h-full rounded-[30px] bg-yellow-400/10 blur-md opacity-60"
              style={{
                animation: 'pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
          </div>
        </div>
        <div
          className="absolute z-30"
          style={{
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative w-[140px] h-auto ml-45 mt-8">
            <img src={IMAGES.yellowBubble} alt="노란 말풍선" className="w-full h-auto" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-white font-semibold text-center leading-snug whitespace-pre-line pointer-events-none">
              처음이라면, {'\n'}이 설명서 꼭 읽어보세요!
            </div>
          </div>
        </div>
        <div className="absolute bottom-80 left-1/2 -translate-x-1/2 z-30">
          <Button
            onClick={goToHome}
            variant="default"
            size="default"
            className="bg-[var(--color-brand-yellow)] hover:bg-[var(--color-brand-yellow-hover)] text-black font-semibold text-sm px-6 py-3 rounded-full"
          >
            MoonoZ 시작하기 →
          </Button>
        </div>

        <div className="absolute top-5 left-6 z-30">
          <BackButton onClick={handleBack} color="white" />
        </div>
      </div>
    );
  }

  return null;
};

export default Tutorial;
