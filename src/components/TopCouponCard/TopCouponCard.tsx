import { Card, CardContent, CardTitle } from '@/components/Card';
import { TopCoupon } from '@/apis/coupon/getTopCoupons';

interface Props {
  deal?: TopCoupon;
  index: number;
  isLoading: boolean;
  getDiscountLabel: (deal: TopCoupon) => string;
}

const TopCouponCard = ({ deal, index, isLoading }: Props) => {
  const showSkeleton = isLoading || !deal;

  return (
    <Card className="relative w-full max-w-[160px] flex flex-col items-center px-3 py-3 gap-2 shadow-md rounded-xl">
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
        <p className="text-xs font-bold text-center truncate max-w-full">{deal.brand}</p>
      )}

      {/* 이미지 */}
      <img
        src={`/images/deal-${index + 1}.png`}
        alt="deal"
        className="w-full h-20 object-cover rounded-md"
      />

      {/* 제목만 노출 */}
      <CardContent className="flex flex-col items-center p-0 w-full min-h-[40px]">
        {showSkeleton ? (
          <div className="h-4 bg-gray-200 rounded-sm animate-pulse w-3/4" />
        ) : (
          <CardTitle
            className="text-sm text-red-500 font-semibold text-center break-words line-clamp-2"
            style={{ wordBreak: 'keep-all' }}
          >
            {deal.title}
          </CardTitle>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCouponCard;
