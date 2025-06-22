import { Banner } from '@/components/Banner';
import { IMAGES } from '@/constant/imagePath';

export const UplusBanner = () => {
  return (
    <Banner
      variant="moonuz"
      size="sm"
      layout="default"
      title="매일 누리는 특별 혜택! 🎁🎉"
      description={
        '유플투쁠, 지금 바로 확인하세요 🐙 \n 날짜를 클릭하면 상세 혜택을 확인할 수 있어요!'
      }
      image={IMAGES.MOONER.MOONER_PRESENT}
      className="mb-6"
    />
  );
};
