import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
  front_image: string; // image_url
  back_image: string;
  special_message: string;
  characteristic: string;
}

// 타코타입 더미데이터
const UBTI_TYPES: UBTIShareType[] = [
  {
    id: 1,
    code: 'TK-SweetChoco',
    name: '말 많은 수다타코',
    emoji: '🍫',
    description:
      '소통의 달인! 카톡방의 분위기 메이커이자 인스타 스토리 왕이에요. 보이스톡이나 페이스타임으로 몇 시간도 거뜬하고, 트위터 스페이스나 클럽하우스 같은 음성 SNS도 자주 이용해요. "ㅋㅋㅋㅋ"보다는 "ㅎㅎㅎㅎ"를 더 많이 쓰는 따뜻한 소통 스타일!',
    front_image: IMAGES.TACO['taco-sub-front'] || '',
    back_image: IMAGES.TACO['taco-sub-back'] || '',
    special_message: '톡친구들이 당신만 기다리고 있어요! 소통왕의 귀환! 👑',
    characteristic: '보이스톡 마스터',
  },
  {
    id: 2,
    code: 'TK-Spicy',
    name: '열정 넘치는 매운타코',
    emoji: '🌶️',
    description:
      '디스코드 게임방 리더! 밤새도록 배그나 롤, 발로란트를 하면서도 팀원들과 끊임없이 소통해요. 유튜브 라이브나 트위치 스트리밍도 즐기고, "가보자고~!" "레츠고!" 같은 에너지 넘치는 표현을 자주 사용해요. MZ세대의 진정한 게이머 소울!',
    front_image: IMAGES.TACO['taco-spicy-front'] || '',
    back_image: IMAGES.TACO['taco-spicy-back'] || '',
    special_message: '당신의 에너지, 완전 킹받네요! (긍정적 의미) 🔥',
    characteristic: '디스코드 MVP',
  },
  {
    id: 3,
    code: 'TK-Eggy',
    name: '집콕영상 마요타코',
    emoji: '🍳',
    description:
      '넷플릭스 & 유튜브 프리미엄 구독자! 하루종일 숏폼 콘텐츠(틱톡, 쇼츠, 릴스)를 보면서 힐링하는 타입이에요. 온라인 쇼핑몰 라이브방송도 자주 보고, "집이 최고지~" "나가기 시러" 같은 편안한 표현을 좋아해요. 코시국 이후 더욱 진화한 집순이/집돌이!',
    front_image: IMAGES.TACO['taco-eggy-front'] || '',
    back_image: IMAGES.TACO['taco-eggy-back'] || '',
    special_message: '집이 곧 성! 당신만의 힐링 공간이 최고예요! 🏠',
    characteristic: '숏폼 중독자',
  },
  {
    id: 4,
    code: 'TK-Greeny',
    name: '감성뮤직 초록타코',
    emoji: '🎶',
    description:
      '스포티파이 플레이리스트 장인! 감성 팟캐스트를 즐겨 듣고, 인스타 스토리에 음악과 함께 일상을 공유하는 타입이에요. "이 노래 완전 취저야" "음악 없으면 못 살아" 같은 표현을 자주 써요. 바이브나 멜론 차트보다는 해외 인디 음악을 더 선호하는 힙스터 기질도!',
    front_image: IMAGES.TACO['taco-greeny-front'] || '',
    back_image: IMAGES.TACO['taco-greeny-back'] || '',
    special_message: '당신의 플레이리스트, 완전 킹왕짱! 🎵',
    characteristic: '플레이리스트 큐레이터',
  },
  {
    id: 5,
    code: 'TK-Milky',
    name: '느긋한 라이트타코',
    emoji: '🥛',
    description:
      '읽씹? 그건 예의 있는 여유죠! 💌\nDM보다 이메일이 더 편한 당신, SNS도 가끔 한 장 올리는 감성파.\n"천천히 해도 돼요", "급할 거 없잖아요~"가 입버릇이고,\n줌 회의에선 조용히 중심 잡는 타입. 무심한 듯 다정한 진짜 어른미 뿜뿜!',
    front_image: IMAGES.TACO['taco-milky-front'] || '',
    back_image: IMAGES.TACO['taco-milky-back'] || '',
    special_message: '속도보다 방향! 당신의 온도에 우리가 위로받아요. 🌙',
    characteristic: '조용히 회의판 정리하는 사람',
  },
  {
    id: 6,
    code: 'TK-Berry',
    name: '달콤상큼 베리타코',
    emoji: '🍓',
    description:
      '틱톡 챌린지 선구자! 인스타 릴스와 틱톡에서 트렌드를 빠르게 캐치하고, 친구들과 함께 챌린지 영상을 만드는 걸 좋아해요. "완전 귀여워!", "이거 대박!" 같은 긍정적인 리액션을 자주 보내고, 이모티콘이나 스티커를 풍성하게 사용하는 소통의 비타민!',
    front_image: IMAGES.TACO['taco-berry-front'] || '',
    back_image: IMAGES.TACO['taco-berry-back'] || '',
    special_message: '당신의 긍정 에너지, 완전 실화냐? (좋은 의미) ☀️',
    characteristic: '틱톡 트렌드세터',
  },
  {
    id: 7,
    code: 'TK-Honey',
    name: '달달꿀 허니타코',
    emoji: '🍯',
    description:
      '카톡 감성 메시지의 장인! 친구들의 고민을 들어주는 따뜻한 상담사 역할을 하며, "괜찮아질 거야", "내가 있잖아" 같은 위로의 말을 잘해요. 보이스 메시지로 따뜻한 목소리를 전하고, 생일이나 기념일을 절대 잊지 않는 관계의 허니버터!',
    front_image: IMAGES.TACO['taco-crunch-front'] || '',
    back_image: IMAGES.TACO['taco-crunch-back'] || '',
    special_message: '당신 같은 친구가 있어서 세상이 따뜻해요! 🍯',
    characteristic: '보이스 메시지 요정',
  },
  {
    id: 8,
    code: 'TK-Cool',
    name: '시원한 민트타코',
    emoji: '🧊',
    description:
      '업무용 슬랙의 프로! 간결하고 명확한 메시지로 효율적인 소통을 추구해요. "수고하셨습니다", "확인했습니다" 같은 정중하면서도 간결한 표현을 선호하고, 이모티콘보다는 텍스트 위주의 소통을 해요. MZ세대지만 밀레니얼의 프로페셔널함을 겸비한 쿨한 타입!',
    front_image: IMAGES.TACO['taco-wasab-front'] || '',
    back_image: IMAGES.TACO['taco-wasab-back'] || '',
    special_message: '프로페셔널함의 끝판왕! 존경스러워요! ❄️',
    characteristic: '슬랙 마스터',
  },
];

const RANDOM_MESSAGES = [
  '이 조합… 완전 밥플릭스 감성! 🍽️🎬', // 밥 먹으며 즐길만한 vibe!
  '보자마자 찐 매력… 손절미? 절대 NO 💯', // 손절하고 싶지 않은 매력
  '이런 vibe면 랜선생님급 조합이에요! 🎓', // 랜선생님 느낌으로 감성 전달
  '완전 무지컬 아님? 완전 힙한데요 🔥', // 무지컬 반전 긍정
  '센스 터진다… 공유각이다 공유각! 📌', // 저장각/공유각 표현
  '심플한데 레전드… 찐 인정 박습니다 👑', // 레전드급 표현
  '인스타 감성+밥플릭스 뿜뿜 vibe! 🌈', // 소셜 미디어 감성
  'AI도 반한 매치… 이건 찐이야! 🤖', // AI 애착 페르소나 저격
];

const UBTIShare: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ubtiType, setUbtiType] = useState<UBTIShareType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [randomMessage, setRandomMessage] = useState('');

  // 쿼리 파라미터에서 사용자 이름 추출
  const userName = searchParams.get('user') || '무너즈';
  const decodedUserName = decodeURIComponent(userName);

  useEffect(() => {
    const typeId = parseInt(id || '0');
    const foundType = UBTI_TYPES.find((type) => type.id === typeId);

    // 랜덤 메시지 설정
    setRandomMessage(RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)]);

    setTimeout(() => {
      setUbtiType(foundType || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleStartTest = () => {
    navigate('/chatbot');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  if (isLoading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center px-4">
        <motion.div
          className="text-center bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-4xl sm:text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          >
            🍳
          </motion.div>
          <div className="text-lg sm:text-xl text-gray-700 font-medium">
            {decodedUserName}님의 타코야끼를 준비하고 있어요...
          </div>
          <div className="text-sm text-gray-500 mt-2">잠시만 기다려주세요 💕</div>
        </motion.div>
      </div>
    );
  }

  if (!ubtiType) {
    return (
      <div className="min-h-full bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center px-4">
        <motion.div
          className="text-center bg-white/90 p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-pink-200 max-w-sm w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10 }}
        >
          <motion.div
            className="text-4xl sm:text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            😅
          </motion.div>
          <div className="text-lg sm:text-xl text-gray-700 font-medium mb-2">
            앗! {decodedUserName}님의 타코야끼를 찾을 수 없어요 🥲
          </div>
          <div className="text-gray-500 pb-6">올바른 링크인지 확인해주세요!</div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={handleGoHome} className="text-sm">
              홈으로 가기
            </Button>
            <Button variant="default" onClick={handleStartTest} className="text-sm">
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
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 12}px`,
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

      <div className="relative z-10 max-w-md mx-auto px-4 py-6 sm:py-8 min-h-full flex flex-col justify-center">
        {/* 타코시그널 로고 */}
        <motion.div
          className="mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <img
            src={IMAGES.TACO['taco-signal']}
            alt="타코시그널"
            className="w-32 sm:w-40 h-auto mx-auto"
          />
        </motion.div>

        {/* 헤더 */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold text-brand-darkblue mb-3">
            🎉 {decodedUserName}님의 <br />
            타코시그널 통신 유형 분석 결과 🎉
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">어떤 타입인지 확인해보세요!</p>
          <motion.p
            className="text-sm text-pink-600 font-medium mt-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {randomMessage}
          </motion.p>
        </motion.div>

        {/* 타코 타입 카드 */}
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border-4 border-pink-200 w-full mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 15 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center">
            {/* 동적 타코 이미지 */}
            <motion.div
              className="mb-4 sm:mb-6 flex justify-center"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src={ubtiType.front_image}
                alt={ubtiType.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-xl sm:rounded-2xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = IMAGES.TACO['taco-main-front'];
                }}
              />
            </motion.div>

            {/* 타입 이름과 특성 */}
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-pink-800 mb-2">
                {decodedUserName}님은 {ubtiType.name}!
              </h2>
              <motion.div
                className="inline-block bg-gradient-to-r from-pink-100 to-orange-100 rounded-full px-4 py-2 mb-3"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(236, 72, 153, 0.2)',
                    '0 0 25px rgba(236, 72, 153, 0.4)',
                    '0 0 15px rgba(236, 72, 153, 0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-pink-600 font-bold text-sm sm:text-base">
                  ✨ {ubtiType.characteristic} ✨
                </span>
              </motion.div>
            </div>

            {/* 설명 */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
              {ubtiType.description}
            </p>

            {/* 특별 메시지 */}
            <motion.div
              className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-xl p-3 sm:p-4 mb-4"
              animate={{
                backgroundColor: [
                  'rgba(254, 249, 195, 0.8)',
                  'rgba(252, 231, 243, 0.8)',
                  'rgba(254, 249, 195, 0.8)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-lg mb-2">🎯</div>
              <p className="text-pink-700 font-bold text-sm sm:text-base">
                {ubtiType.special_message}
              </p>
            </motion.div>

            {/* 개인화 메시지 */}
            <motion.div
              className="inline-block bg-white/60 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-pink-600 font-bold text-sm sm:text-lg">
                {decodedUserName}님은 완전 매력적인 타입! 💖
              </span>
            </motion.div>

            {/* 타입 코드 */}
            <motion.div
              className="inline-block bg-white/50 rounded-full px-3 sm:px-4 py-1 sm:py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-xs sm:text-sm text-gray-600 font-mono">{ubtiType.code}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 액션 버튼들 */}
        <motion.div
          className="space-y-3 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FocusableButton
              onClick={handleStartTest}
              variant="gradient-pink"
              size="xl"
              className="w-full text-sm sm:text-base"
            >
              <span className="text-lg sm:text-xl mr-2">🚀</span>
              나도 {decodedUserName}님처럼 테스트해보기!
            </FocusableButton>
          </motion.div>
        </motion.div>

        {/* 푸터 메시지 */}
        <motion.div
          className="text-center mt-6 sm:mt-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-caption-1">
            💡 {decodedUserName}님처럼 재밌는 테스트 결과를 받고 싶다면?
          </p>
          <p className="text-caption-1 mt-1">무너즈와 함께 나만의 타코시그널을 찾아보세요! 🌟</p>

          <Button
            onClick={handleGoHome}
            variant="link"
            size="lg"
            className="w-full text-caption-1 sm:text-lg py-3"
          >
            <span className="mr-1">🏠</span>
            무너즈 홈 바로가기
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default UBTIShare;
