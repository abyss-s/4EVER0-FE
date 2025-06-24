// import { Card, CardContent, CardTitle, CardDescription } from '@/components/Card';
// import { TopCoupon } from '@/apis/coupon/getTopCoupons';

// interface Props {
//   deal?: TopCoupon;
//   index: number;
//   isLoading: boolean;
//   getDiscountLabel: (deal: TopCoupon) => string;
// }

// const TopCouponCard = ({ deal, index, isLoading, getDiscountLabel }: Props) => {
//   const showSkeleton = isLoading || !deal;

//   return (
//     <Card className="relative flex flex-row items-start px-4 py-3 gap-4 shadow-md rounded-xl">
//       {/* 순위 뱃지 */}
//       <div
//         className={`absolute -top-3 -left-3 w-10 h-10 rounded-full text-white text-sm flex items-center justify-center font-bold shadow-md ${
//           index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
//         }`}
//       >
//         {index + 1}위
//       </div>

//       {/* 왼쪽: 브랜드명 + 이미지 */}
//       <div className="flex flex-col items-center w-28 pt-4">
//         {showSkeleton ? (
//           <div className="w-20 h-4 bg-gray-200 mb-2 rounded animate-pulse" />
//         ) : (
//           <p className="text-sm font-bold text-center mb-2">{deal.brand}</p>
//         )}

//         <img
//           src={`/images/deal-${index + 1}.png`}
//           alt="deal"
//           className="w-full h-20 object-cover rounded-md"
//         />
//       </div>

//       {/* 오른쪽: 정보 */}
//       <CardContent className="flex-1 pt-4 p-0">
//         {showSkeleton ? (
//           <>
//             <div className="h-4 mb-2 bg-gray-200 rounded-sm animate-pulse w-3/4" />
//             <div className="h-3 mb-2 bg-gray-100 rounded-sm animate-pulse w-full" />
//             <div className="h-3 bg-gray-100 rounded-sm animate-pulse w-1/2" />
//           </>
//         ) : (
//           <>
//             <CardTitle className="text-base font-bold mb-1">{deal.title}</CardTitle>
//             <CardDescription className="text-sm mb-2">{deal.description}</CardDescription>
//             <span className="text-red-500 text-sm font-bold">{getDiscountLabel(deal)}</span>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default TopCouponCard;

import { Card, CardContent, CardTitle, CardDescription } from '@/components/Card';
import { TopCoupon } from '@/apis/coupon/getTopCoupons';

interface Props {
  deal?: TopCoupon;
  index: number;
  isLoading: boolean;
  getDiscountLabel: (deal: TopCoupon) => string;
}

const TopCouponCard = ({ deal, index, isLoading, getDiscountLabel }: Props) => {
  const showSkeleton = isLoading || !deal;

  return (
    <Card className="w-full max-w-[160px] flex flex-col items-center px-3 py-3 gap-2 shadow-md rounded-xl">
      {/* 순위 뱃지 */}
      <div
        className={`absolute -top-3 -left-3 w-7 h-7 rounded-full text-white text-[10px] flex items-center justify-center font-bold shadow ${
          index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'
        }`}
      >
        {index + 1}위
      </div>

      {/* 브랜드명 */}
      {showSkeleton ? (
        <div className="w-20 h-4 bg-gray-200 mb-1 rounded animate-pulse" />
      ) : (
        <p className="text-xs font-bold text-center">{deal.brand}</p>
      )}

      {/* 이미지 */}
      <img
        src={`/images/deal-${index + 1}.png`}
        alt="deal"
        className="w-full h-20 object-cover rounded-md"
      />

      {/* 정보 */}
      <CardContent className="flex flex-col items-start gap-1 p-0 w-full">
        {showSkeleton ? (
          <>
            <div className="h-4 bg-gray-200 rounded-sm animate-pulse w-3/4" />
            <div className="h-3 bg-gray-100 rounded-sm animate-pulse w-full" />
            <div className="h-3 bg-gray-100 rounded-sm animate-pulse w-1/2" />
          </>
        ) : (
          <>
            <CardTitle className="text-sm font-semibold leading-snug">{deal.title}</CardTitle>
            <CardDescription className="text-xs leading-tight line-clamp-2">
              {deal.description}
            </CardDescription>
            <span className="text-red-500 text-xs font-bold">{getDiscountLabel(deal)}</span>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCouponCard;
