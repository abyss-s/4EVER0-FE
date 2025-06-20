import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '@/constant/imagePath';
import { FocusableButton } from '@/components/Popover/FocusableButton';
import { Button } from '@/components/Button';

interface UBTIShareType {
  id: number;
  code: string;
  name: string;
  emoji: string;
  description: string;
  image_url: string;
}

// 타코타입 더미데이터
const UBTI_TYPES: UBTIShareType[] = [
  {
    id: 1,
    code: 'TK-SweetChoco',
    name: '말 많은 수다타코',
    emoji: '🍫',
    description:
      '편안한 소통을 좋아하고 대화를 통해 에너지를 얻는 타입이에요! 친구들과 끝없이 수다떨 수 있는 매력쟁이랍니다.',
    image_url: 'https://example.com/images/sweetchoco.png',
  },
  {
    id: 2,
    code: 'TK-Spicy',
    name: '열정 넘치는 매운타코',
    emoji: '🌶️',
    description:
      '뜨거운 열정과 에너지로 가득한 타입! 새로운 도전을 좋아하고 항상 활기차게 살아가는 스타일이에요.',
    image_url: 'https://example.com/images/spicy.png',
  },
  {
    id: 3,
    code: 'TK-Eggy',
    name: '집콕영상 마요타코',
    emoji: '🍳',
    description:
      '안정적인 환경에서 편안하게 즐길 수 있는 콘텐츠를 선호하는 타입이에요. 집에서 여유롭게 시간을 보내고 싶어하는 분들께 적합해요.',
    image_url: 'https://example.com/images/eggy.png',
  },
  {
    id: 4,
    code: 'TK-Greeny',
    name: '감성뮤직 초록타코',
    emoji: '🎶',
    description:
      '감성적인 취향을 가진 분들로, 음악과 감정의 연결을 소중히 여기는 타입이에요! 멜로디에 감정을 담아 표현하는 걸 좋아해요.',
    image_url: 'https://example.com/images/greeny.png',
  },
  {
    id: 5,
    code: 'TK-Milky',
    name: '느긋한 라이트타코',
    emoji: '🥛',
    description:
      '편안하고 느긋한 소통을 중시하는 타입이에요. 대화를 나누는 것을 즐기고, 여유로운 일상을 좋아하는 분들이 많아요.',
    image_url: 'https://example.com/images/milky.png',
  },
  {
    id: 6,
    code: 'TK-Berry',
    name: '달콤상큼 베리타코',
    emoji: '🍓',
    description:
      '밝고 상쾌한 에너지를 가진 타입! 긍정적이고 활발한 성격으로 주변을 즐겁게 만드는 매력이 있어요.',
    image_url: 'https://example.com/images/berry.png',
  },
  {
    id: 7,
    code: 'TK-Honey',
    name: '달달꿀 허니타코',
    emoji: '🍯',
    description:
      '따뜻하고 부드러운 마음을 가진 타입이에요. 다른 사람을 배려하고 포근한 분위기를 만드는 걸 좋아해요.',
    image_url: 'https://example.com/images/honey.png',
  },
  {
    id: 8,
    code: 'TK-Cool',
    name: '시원한 민트타코',
    emoji: '🧊',
    description:
      '냉정하고 차분한 판단력을 가진 타입! 논리적이고 체계적인 접근을 선호하며, 효율성을 중시해요.',
    image_url: 'https://example.com/images/cool.png',
  },
];

const UBTIShare: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ubtiType, setUbtiType] = useState<UBTIShareType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const typeId = parseInt(id || '0');
    const foundType = UBTI_TYPES.find((type) => type.id === typeId);

    setTimeout(() => {
      setUbtiType(foundType || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleStartTest = () => {
    navigate('/ubti');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  if (isLoading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <motion.div
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            🍳
          </motion.div>
          <div className="text-xl text-gray-700 font-medium">타코야끼를 준비하고 있어요...</div>
          <div className="text-sm text-gray-500 mt-2">잠시만 기다려주세요 💕</div>
        </motion.div>
      </div>
    );
  }

  if (!ubtiType) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <motion.div
          className="text-center bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-pink-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            😅
          </motion.div>
          <div className="text-xl text-gray-700 font-medium mb-2">
            앗! 타코야끼를 찾을 수 없어요
          </div>
          <div className="text-gray-500 pb-6">올바른 링크인지 확인해주세요!</div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleGoHome}>
              홈으로 가기
            </Button>
            <Button variant="default" onClick={handleStartTest}>
              테스트 해보기
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-pink-50 via-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      {/* 애니메이션 배경 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 15}px`,
            }}
            animate={{
              y: [-20, -40, -20],
              x: [-5, 5, -5],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          >
            {['💕', '💖', '✨', '🌟'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* 타코시그널 로고 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <img src={IMAGES.TACO['taco-signal']} alt="타코시그널" className="w-[160px] h-auto" />
        </motion.div>

        {/* 헤더 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎉 친구의 타코시그널 결과 🎉</h1>
          <p className="text-gray-600 text-lg">어떤 타입인지 확인해보세요!</p>
        </motion.div>

        {/* 타코 타입 카드 */}
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-pink-200 max-w-md w-full mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 15 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center">
            <motion.div
              className="text-8xl mb-6"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {ubtiType.emoji}
            </motion.div>

            <h2 className="text-2xl font-bold text-pink-800 mb-4">{ubtiType.name}</h2>

            <p className="text-gray-700 leading-relaxed text-base mb-6">{ubtiType.description}</p>

            <motion.div
              className="inline-block bg-gradient-to-r from-pink-100 to-orange-100 rounded-full px-6 py-3"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(236, 72, 153, 0.2)',
                  '0 0 30px rgba(236, 72, 153, 0.4)',
                  '0 0 20px rgba(236, 72, 153, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-pink-600 font-bold text-lg">완전 매력적인 타입! 💖</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 공유 버튼 */}
        <motion.div
          className="flex flex-col gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FocusableButton
              onClick={handleStartTest}
              variant="gradient-pink"
              size="xl"
              className="w-full"
            >
              <span className="text-xl mr-2">🚀</span>
              나도 테스트 해보기!
            </FocusableButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FocusableButton
              onClick={handleGoHome}
              variant="gradient-pink"
              size="lg"
              className="w-full"
            >
              무너즈 홈으로 가기
            </FocusableButton>
          </motion.div>
        </motion.div>

        {/* 푸터 메시지 */}
        <motion.div
          className="text-center mt-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm">💡 나도 이런 재밌는 테스트 결과를 받고 싶다면?</p>
          <p className="text-xs mt-1">무너즈와 함께 나만의 타코시그널을 찾아보세요! 🌟</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UBTIShare;
