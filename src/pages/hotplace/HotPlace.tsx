import { ScrollArea } from '@/components/ui/scroll-area';
import NaverMap from '@/components/NaverMap/NaverMap';

const HotPlace = () => {
  const bestDeals = [
    {
      rank: 1,
      title: '넷플릭스 얼정해',
      subtitle: '넷플릭스에서 영화와 시리즈를 저렴한 요금으로 즐겨보세요!',
      discount: '500원 할인',
      badge: '요금제',
      image: '/images/deal-1.png',
    },
    {
      rank: 2,
      title: '예스24 프리미엄 30일 이용권',
      subtitle: '전문 도서 큐레이션과 리뷰까지 프리미엄 경험',
      discount: '₩4,500원',
      badge: '구독',
      image: '/images/deal-2.png',
    },
    {
      rank: 3,
      title: '유튜브 프리미엄+CGV 구독팩',
      subtitle: '유튜브와 CGV까지 한번에! 영화관람권 포함',
      discount: '월 14,900원',
      badge: '쿠폰',
      image: '/images/deal-3.png',
    },
  ];

  return (
    <ScrollArea className="h-screen w-full">
      <div className="max-w-md mx-auto bg-pink-50 min-h-screen">
        {/* 상단 지도 섹션 */}
        <div className="relative p-12">
          <div className="flex justify-center m-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
              ⭐ 요즘 핫한 MZ들의 PICK은?!
            </div>
          </div>

          {/* 네이버 지도 영역 */}
          <div className="relative h-[340px] rounded-xl overflow-hidden border-4 border-yellow-400">
            <NaverMap />

            {/* 범례 */}
            <div className="absolute right-4 top-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  9
                </div>
                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">📃 쿠폰</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">📌 핫플</span>
              </div>
            </div>

            {/* 하단 유저 위치 프로필 */}
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white">👤</span>
            </div>
          </div>
        </div>

        {/* BEST 혜택 3위 */}
        <div className="px-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
              ⭐ BEST 혜택 3위
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {bestDeals.map((deal, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-2 relative">
                <div
                  className={`absolute -top-2 -left-2 w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-bold z-10 ${
                    index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                >
                  {deal.rank}위
                </div>

                <img
                  src={deal.image}
                  alt="deal"
                  className="w-full h-24 object-cover rounded-md mb-2"
                />

                <h3 className="font-bold text-xs mb-1 line-clamp-2">{deal.title}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{deal.subtitle}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-red-500 font-bold">{deal.discount}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-white ${
                      deal.badge === '요금제'
                        ? 'bg-indigo-500'
                        : deal.badge === '구독'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                    }`}
                  >
                    {deal.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default HotPlace;
