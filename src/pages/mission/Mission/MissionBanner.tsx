import { Banner } from '@/components/Banner';
import { IMAGES } from '@/constant/imagePath';

export const MissionBanner = () => {
  return (
    <Banner
      variant="pinkblue"
      size="sm"
      layout="default"
      title="지금 미션 시작하면 포인트가 와르르 🎁"
      description="할 수 있다, 무너처럼!"
      image={IMAGES.MOONER.MOONER_GAME}
      className="mb-6"
    />
  );
};
