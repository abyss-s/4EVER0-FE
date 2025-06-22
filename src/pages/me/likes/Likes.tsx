import { useQuery } from '@tanstack/react-query';
import { fetchLikedCoupons } from '@/apis/like/getLikeCoupons';
import { fetchCoupons } from '@/apis/coupon/getCoupons';
import { Coupon } from '@/components/Coupon';
import { Gift } from 'lucide-react';

const Likes: React.FC = () => {
  // 좋아요한 쿠폰
  const { data: userLikeCoupons = [], isLoading: loadingUser } = useQuery({
    queryKey: ['userLikeCoupons'],
    queryFn: fetchLikedCoupons,
  });

  // 전체 쿠폰
  const { data: coupons = [], isLoading: loadingCoupons } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchCoupons,
  });

  if (loadingUser || loadingCoupons) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  // userLikeCoupons 기준으로 이미지 등 추가정보 merge → 변수명 likedCoupons로 사용
  const likedCoupons = userLikeCoupons.map((like) => {
    const matched = coupons.find((coupon) => coupon.id === like.id);
    return {
      ...like,
      imageUrl: matched?.brand.imageUrl ?? '',
      dateRange: `${like.start_date} ~ ${like.end_date}`,
      brandName: like.brand_name ?? matched?.brand?.name ?? '',
    };
  });

  return (
    <div className="min-h-full bg-white">
      <div className="p-6 flex flex-col items-center">
        {likedCoupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">좋아요한 쿠폰 목록</h2>
            <p className="text-gray-500 text-sm">좋아요한 쿠폰이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-pink-500" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">좋아요한 쿠폰 목록</h2>
              <p className="text-gray-500 text-sm">
                {likedCoupons.length}개의 쿠폰을 좋아요 했습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 items-center">
              {likedCoupons.map((coupon) => (
                <Coupon
                  key={coupon.id}
                  type="liked"
                  brandName={coupon.brandName}
                  description={coupon.description}
                  dateRange={coupon.dateRange}
                  imageUrl={coupon.imageUrl}
                  // 필요시 추가 prop
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Likes;
