import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserCoupons } from '@/apis/coupon/getUserCoupons';
import type { Coupon } from '@/types/coupon';
import { Ticket } from 'lucide-react';
import Empty from '@/pages/common/Empty';
import { IMAGES } from '@/constant/imagePath';
import { Coupon as CouponCard } from '@/components/Coupon/Coupon';
import { Skeleton } from '@/components/Skeleton';
import CouponBarcodeModal from '@/components/Modal/CouponBarcodeModal';

const Coupons: React.FC = () => {
  const { data: coupons = [], isLoading } = useQuery<Coupon[]>({
    queryKey: ['userCoupons'],
    queryFn: fetchUserCoupons,
  });

  const availableCoupons = coupons.filter((c) => !c.isUsed);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  if (isLoading) {
    return (
      <div className="px-4 py-6 pb-24 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-24">
      <div className="text-center mb-6">
        <div className="w-16 h-16	bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">보유 쿠폰</h2>
        <p className="text-gray-500 text-sm">{availableCoupons.length}개의 쿠폰을 보유 중입니다.</p>
      </div>

      {availableCoupons.length === 0 ? (
        <Empty
          imageSrc={IMAGES.MOONER['mooner-sad']}
          altText="보유 쿠폰 없음"
          message="보유한 쿠폰이 없습니다."
          buttonText="유독 라이프 혜택 PICK 하러가기"
          buttonLink="/home"
        />
      ) : (
        <div className="flex flex-col gap-5">
          {availableCoupons.map((coupon, index) => (
            <CouponCard
              key={coupon.couponId ?? `coupon-${index}`}
              type="owned"
              brandName={coupon.brand.name}
              description={coupon.title}
              dateRange={`${coupon.startDate?.replace(/-/g, '.')} - ${coupon.endDate?.replace(/-/g, '.')}`}
              imageUrl={coupon.brand.imageUrl}
              onClickUse={() => {
                setSelectedCoupon(coupon);
                setBarcodeModalOpen(true);
              }}
            />
          ))}
        </div>
      )}
      {selectedCoupon && (
        <CouponBarcodeModal
          open={barcodeModalOpen}
          onClose={() => setBarcodeModalOpen(false)}
          brandName={selectedCoupon.brand.name}
          barcodeValue={selectedCoupon.couponId.toString()}
        />
      )}
    </div>
  );
};

export default Coupons;
