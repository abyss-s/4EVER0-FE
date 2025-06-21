// import NaverMap from '@/components/NaverMap/NaverMap';

// const HotPlace = () => {
//   const bestDeals = [
//     {
//       rank: 1,
//       title: '넷플릭스 월정액',
//       subtitle: '넷플릭스에서 영화와 시리즈를 저렴한 요금으로 즐겨보세요!',
//       discount: '500원 할인',
//       badge: '요금제',
//       image: '/images/deal-1.png',
//     },
//     {
//       rank: 2,
//       title: '예스24 프리미엄 30일 이용권',
//       subtitle: '전문 도서 큐레이션과 리뷰까지 프리미엄 경험',
//       discount: '₩4,500원',
//       badge: '구독',
//       image: '/images/deal-2.png',
//     },
//     {
//       rank: 3,
//       title: '유튜브 프리미엄+CGV 구독팩',
//       subtitle: '유튜브와 CGV까지 한번에! 영화관람권 포함',
//       discount: '월 14,900원',
//       badge: '쿠폰',
//       image: '/images/deal-3.png',
//     },
//   ];

//   return (
//     <div className="max-w-md mx-auto bg-pink-50 min-h-screen">
//       {/* 상단 지도 섹션 */}
//       <div className="relative p-12">
//         <div className="flex justify-center m-4">
//           <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
//             ⭐ 요즘 핫한 MZ들의 PICK은?!
//           </div>
//         </div>

//         {/* 네이버 지도 영역 */}
//         <div className="relative h-[340px] rounded-xl overflow-hidden border-4 border-yellow-400">
//           <NaverMap />

//           {/* 범례 */}
//           <div className="absolute right-4 top-4 space-y-2">
//             <div className="flex items-center space-x-2">
//               <div className="w-6 h-6 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
//                 9
//               </div>
//               <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">📃 쿠폰</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
//                 3
//               </div>
//               <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">📌 핫플</span>
//             </div>
//           </div>

//           {/* 하단 유저 위치 프로필 */}
//           <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
//             <span className="text-white">👤</span>
//           </div>
//         </div>
//       </div>

//       {/* BEST 혜택 3위 */}
//       <div className="px-4">
//         <div className="flex justify-center mb-4">
//           <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
//             ⭐ BEST 혜택 3위
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           {bestDeals.map((deal, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-md p-2 relative">
//               <div
//                 className={`absolute -top-2 -left-2 w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-bold z-10 ${
//                   index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
//                 }`}
//               >
//                 {deal.rank}위
//               </div>

//               <img
//                 src={deal.image}
//                 alt="deal"
//                 className="w-full h-24 object-cover rounded-md mb-2"
//               />

//               <h3 className="font-bold text-xs mb-1 line-clamp-2">{deal.title}</h3>
//               <p className="text-gray-600 text-xs mb-2 line-clamp-2">{deal.subtitle}</p>
//               <div className="flex justify-between text-xs">
//                 <span className="text-red-500 font-bold">{deal.discount}</span>
//                 <span
//                   className={`px-2 py-0.5 rounded text-white ${
//                     deal.badge === '요금제'
//                       ? 'bg-indigo-500'
//                       : deal.badge === '구독'
//                         ? 'bg-green-500'
//                         : 'bg-red-500'
//                   }`}
//                 >
//                   {deal.badge}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotPlace;

import { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap/NaverMap';
import { apiWithToken } from '@/lib/api/apiconfig';

export interface Coupon {
  id: number;
  title: string;
  description: string;
  brand: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  startDate: string;
  endDate: string;
  likes: number;
}

const HotPlace = () => {
  const [bestDeals, setBestDeals] = useState<Coupon[] | null>(null);

  useEffect(() => {
    const fetchBestCoupons = async () => {
      try {
        const res = await apiWithToken.get('/coupons/best');
        const coupons: Coupon[] = res.data?.data?.slice(0, 3) || [];
        setBestDeals(coupons);
      } catch (error) {
        console.error('❌ BEST 쿠폰 불러오기 실패:', error);
        setBestDeals([]); // 틀은 유지되도록 빈 배열로 설정
      }
    };

    fetchBestCoupons();
  }, []);

  const getDiscountLabel = (deal: Coupon) => {
    return deal.discountType === 'PERCENT'
      ? `${deal.discountValue}% 할인`
      : `${deal.discountValue.toLocaleString()}원 할인`;
  };

  const getBadgeColor = (brand: string) => {
    if (brand.includes('넷플릭스') || brand.includes('왓챠')) return 'bg-indigo-500';
    if (brand.includes('예스24') || brand.includes('리디')) return 'bg-green-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-md mx-auto bg-pink-50 min-h-screen">
      {/* 상단 지도 영역 */}
      <div className="relative p-12">
        <div className="flex justify-center m-4">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            ⭐ 요즘 핫한 MZ들의 PICK은?!
          </div>
        </div>

        <div className="relative h-[340px] rounded-xl overflow-hidden border-4 border-yellow-400">
          <NaverMap />

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

          <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            option === 'popup' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setOption('popup')}
        >
          팝업맵 보기
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            option === 'store' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setOption('store')}
        >
          스토어맵 보기
        </button>
      </div>

      {/* store 옵션일 때 브랜드 선택 팝오버 보여주기 */}
      {option === 'store' && (
        <div className="flex justify-center mb-4">
          <SelectorPopover
            brandIds={allBrandIds}
            selectedIds={selectedBrandIds}
            onChange={setSelectedBrandIds}
          />
        </div>
      )}

      {option === 'popup' ? (
        <PopupMap />
      ) : (
        <StoreMap allBrandIds={allBrandIds} selectedIds={selectedBrandIds} />
      )}

      <div className="px-4">
        <div className="flex justify-center py-4">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
            ⭐ 인기 쿠폰 TOP 3
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => {
            const deal = bestDeals?.[index];
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-2 relative">
                {/* 순위 배지 */}
                <div
                  className={`absolute -top-2 -left-2 w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-bold z-10 ${
                    index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                >
                  {index + 1}위
                </div>

                {/* 이미지: 없으면 빈 영역 유지 */}
                <img
                  src={`/images/deal-${index + 1}.png`}
                  alt="deal"
                  className="w-full h-24 object-cover rounded-md mb-2"
                />

                {deal ? (
                  <>
                    <h3 className="font-bold text-xs mb-1 line-clamp-2">{deal.title}</h3>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{deal.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-red-500 font-bold">{getDiscountLabel(deal)}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-white ${getBadgeColor(deal.brand)}`}
                      >
                        {deal.brand}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-[2rem] mb-2 bg-gray-100 rounded-sm animate-pulse" />
                    <div className="h-[1rem] bg-gray-100 rounded-sm animate-pulse" />
                    <div className="flex justify-between text-xs mt-2">
                      <span className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
                      <span className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotPlace;
