import { Card, CardContent, CardTitle } from '@/components/Card';
import { TopCoupon } from '@/apis/coupon/getTopCoupons';
import { IMAGES } from '@/constant/imagePath';

interface Props {
  deal?: TopCoupon;
  index: number;
  isLoading: boolean;
  getDiscountLabel: (deal: TopCoupon) => string;
}

const TopCouponCard = ({ deal, index, isLoading }: Props) => {
  const showSkeleton = isLoading || !deal;
  const key = deal
    ? (`COUPON_${deal.id}` as keyof typeof IMAGES.COUPON)
    : ('COUPON_1' as keyof typeof IMAGES.COUPON);

  return (
    <Card
      className="
        relative
        w-full max-w-[140px]        
        flex flex-col items-center
        px-3 py-3 gap-2
        shadow-md rounded-lg        
      "
    >
      {/* 순위 뱃지 */}
      <div
        className={`
          absolute
          -top-2 -left-2            
          w-6 h-6                  
          rounded-full text-white text-[10px]
          flex items-center justify-center font-bold shadow
          ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-gray-500'}
        `}
      >
        {index + 1}위
      </div>

      {/* 브랜드 로고 or 이미지 */}
      {showSkeleton ? (
        <div className="w-12 h-12 bg-gray-200 rounded-full mb-1 animate-pulse" />
      ) : (
        <img
          src={IMAGES.COUPON[key]}
          alt="deal"
          className="
            w-12 h-12                
            object-contain           
            rounded-full
            shadow-md            
            mb-1
          "
        />
      )}

      {/* 브랜드명 */}
      {showSkeleton ? (
        <div className="w-3/4 h-4 bg-gray-200 rounded mb-1 animate-pulse" />
      ) : (
        <p className="text-sm font-semibold text-center truncate mb-1"> {deal.brand}</p>
      )}

      {/* 쿠폰 제목 */}
      <CardContent className="flex flex-col items-center p-0 w-full">
        {showSkeleton ? (
          <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse" />
        ) : (
          <CardTitle
            className="
              text-xs
              text-red-500 font-medium
              text-center
              leading-snug             
              line-clamp-2
            "
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
