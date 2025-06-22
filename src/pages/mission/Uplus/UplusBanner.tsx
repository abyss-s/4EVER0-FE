import { Banner } from '@/components/Banner';
import { IMAGES } from '@/constant/imagePath';

export const UplusBanner = () => {
  return (
    <Banner
      variant="moonuz"
      size="sm"
      layout="default"
      title="매일 누리는 특별 혜택! 🎁🎉"
      description="지금 바로 확인하세요 🐙"
      image={IMAGES.MOONER.MOONER_PRESENT}
      className="mb-6"
    />
  );
};
